import { BossLog, callChallengeBoss, callUpdate, callStatus } from "../api/ApiObjects";
import { store } from "../redux/store";
import { setCombatAction, setDamage, startCombat, endCombat, setReward, clearChallengeBoss, setChallengeBoss, clearAutoChallenge } from "../redux/combat/actions";
import { ENTER_TIME, DEATH_TIME } from "./EnemyDisplay";
import { setMana, setPlayerInfo, setManaRate } from "../redux/player/actions";
import { getLocationInfo, DUNGEONS } from "./locationInfo";
import { CombatActor, PlayerCombatActor } from "./CombatSim/CombatActor";

export const ATTACKS_PER_MIN = 25;
export const DEFAULT_ACTION_TIME = 60 / ATTACKS_PER_MIN;
export const COMBATS_PER_MIN = 5;

const splitLog = (log: BossLog[]): { playerLog: BossLog[], enemyLog: BossLog[] } => {
    return { playerLog: log.filter(v => !v.toPlayer), enemyLog: log.filter(v => v.toPlayer) };
};

const HP_RANGE = 0.3;

const fuzzNumber = (initial: number, range: number): number => {
    return initial * (1.0 - range + Math.random() * range * 2);
}

const generateMockCombat = (): { log: BossLog[], start_hp: number } => {
    const playerInfo = store.getState().player;
    const startHp = fuzzNumber(getLocationInfo(playerInfo.dungeon, playerInfo.floor).enemyHp, HP_RANGE);

    let player: CombatActor = new PlayerCombatActor(playerInfo);
    let enemy: CombatActor = new CombatActor({
        damagePerHit: 0,
        attackSpeed: Infinity,
        critMult: 1,
        critRate: 0,
        hp: startHp,
        toNextAttack: Infinity,
        skillCharge: 0,
        skills: [],
        effects: []
    });
    let combatLog: BossLog[] = [];

    let millisecondsElapsed = 0;
    while (enemy.info.hp > 0) {
        // Only player acts in these combats
        let logElem: BossLog = player.runAction(enemy);
        // Tick effects
        player.info.effects.forEach(eff => eff.tickEffectAction(player));
        player.info.effects.forEach(eff => eff.tickEffect(logElem.time / 1000, player));
        enemy.info.effects.forEach(eff => eff.tickEffect(logElem.time / 1000, enemy));
        // Remove effects
        player.info.effects = player.info.effects.filter(eff => !eff.expired);
        enemy.info.effects = enemy.info.effects.filter(eff => !eff.expired);
        // Elapse time
        millisecondsElapsed += logElem.time;
        player.info.toNextAttack -= logElem.time;

        // Fill in combat log
        logElem.time = millisecondsElapsed / 1000;
        logElem.remainingHp = player.info.hp;
        logElem.bossHp = enemy.info.hp;
        logElem.playerCharge = player.info.skillCharge;
        combatLog.push(logElem);
    }

    return {
        log: combatLog,
        start_hp: startHp
    };
}

const createActorTimeouts = (log: BossLog[], isPlayer: boolean, secondOffset: number) => {
    const firstActionStart = isPlayer ? -log[0].time : 0;

    for (let i = 0; i < log.length; i++) {
        // The animation starts at a constant % between last action and this action,
        // and ends at the same % between this action and next action.
        // If there is no last action, treat it as -(this time)
        // If there is no next action, treat it as (this time + (this time - last time))
        const lastActionTime: number = i === 0 ? firstActionStart : log[i - 1].time;
        const nextActionTime: number = i === log.length - 1 ? log[i].time * 2 - lastActionTime : log[i + 1].time;
        const startAnimation: number = lastActionTime + (log[i].time - lastActionTime) * ANIMATION_OFFSET;
        const endAnimation: number = log[i].time + (nextActionTime - log[i].time) * ANIMATION_OFFSET

        // Create timeout for animation
        setTimeout(() => {
            store.dispatch(setCombatAction({
                time: endAnimation - startAnimation,
                startTime: Date.now(),
                skillCharge: isPlayer ? log[i].playerCharge : 0,
                ...(log[i].details["skill"] ? { type: "SKILL", skillId: parseInt(log[i].details["skill"]) } : { type: "ATTACK" })
            }, isPlayer ? "PLAYER" : "ENEMY"));
        }, ENEMY_ENTRY_TIME + startAnimation * 1000 - secondOffset * 1000);
        // Create timeout to clear animation
        setTimeout(() => {
            store.dispatch(setCombatAction({
                time: DEFAULT_ACTION_TIME,
                startTime: Date.now(),
                skillCharge: isPlayer ? log[i].playerCharge : 0,
                type: "NONE"
            }, isPlayer ? "PLAYER" : "ENEMY"));
        }, ENEMY_ENTRY_TIME + endAnimation * 1000 - secondOffset * 1000);

        // Create timeout for damage
        setTimeout(() => {
            store.dispatch(setDamage(log[i].damageDealt, isPlayer ? "ENEMY" : "PLAYER"));
        }, ENEMY_ENTRY_TIME + log[i].time * 1000 - secondOffset * 1000);
    }
}
// How much earlier do we show animations than damage?
const ANIMATION_OFFSET = 0.5;
const ENEMY_ENTRY_TIME = ENTER_TIME * 1000;

export const createCombatTimeouts = (log: BossLog[], startHp: number, secondOffset: number) => {
    const { playerLog, enemyLog } = splitLog(log);
    // Second offset is the time combat is finished. Find the real time offset from the log
    const realOffset = log[log.length - 1].time - secondOffset;

    // Start the combat
    store.dispatch(startCombat(store.getState().player.hp, startHp, store.getState().combat.challengeBossNext, log, realOffset));

    // Add timeouts for animations and damage
    createActorTimeouts(playerLog, true, realOffset);
    createActorTimeouts(enemyLog, false, realOffset);

    setTimeout(() => {
        if (store.getState().combat.actions.enemy.type === "ENTERING") {
            let time = enemyLog.length ? enemyLog[0].time : DEFAULT_ACTION_TIME;
            store.dispatch(setCombatAction({
                time: time,
                startTime: Date.now(),
                skillCharge: 0,
                type: "NONE"
            }, "ENEMY"));
        }

        // Clear challenge flag
        if (store.getState().combat.enemyType === "BOSS" && store.getState().combat.challengeBossNext) {
            store.dispatch(clearChallengeBoss());
        }
    }, ENEMY_ENTRY_TIME - realOffset * 1000);

    let chainNext: boolean = true;
    setTimeout(async () => {
        const lastLog = log[log.length - 1];
        const playerDead: boolean = lastLog.remainingHp <= 0 || lastLog.bossHp > 0;
        store.dispatch(setCombatAction({
            time: DEATH_TIME,
            startTime: Date.now(),
            skillCharge: 0,
            type: "DYING"
        }, playerDead ? "PLAYER" : "ENEMY"));
        // At end of combat, get rewards
        if (playerDead) {
            store.dispatch(clearAutoChallenge());
        } else {
            const _combatStart = store.getState().combat.combatStart;
            const [update, status] = await Promise.all([callUpdate({}), callStatus({})]);
            store.dispatch(setPlayerInfo(status));
            if (status.max_floor <= status.floor && status.dungeon === DUNGEONS.TAVERN_CELLAR) {
                store.dispatch(clearAutoChallenge());
            }
            if ("log" in update.result) {
                chainNext = false;
                const log: BossLog[] = JSON.parse(update.result.log);
                // Sure, we're fudging the hp a bit. Whatever.
                store.dispatch(setChallengeBoss());
                createCombatTimeouts(log, log[0].bossHp + (log[0].toPlayer ? 0 : log[0].damageDealt), update.result.time_offset);
            } else if (store.getState().combat.combatStart === _combatStart) {
                store.dispatch(setReward([
                    { reward: { type: "MANA", amount: update.result.gain } },
                    ...update.result.rewards
                ]));
                store.dispatch(setMana(update.result.total));
                if (store.getState().player.manaPerMin !== update.result.per_min) {
                    store.dispatch(setManaRate(update.result.per_min));
                }
            }
        }
    }, log[log.length - 1].time * 1000 + ENEMY_ENTRY_TIME - realOffset * 1000);

    setTimeout(() => {
        // After death, end combat and start a new one after 12s from very start of combat
        const untilNextCombat = store.getState().combat.enemyType === "BOSS" ? 6000 : store.getState().combat.combatStart + (60 / COMBATS_PER_MIN) * 1000 - Date.now();
        setTimeout(() => {
            if (chainNext) {
                runCombat();
            }
        }, untilNextCombat);
        store.dispatch(endCombat());
    }, log[log.length - 1].time * 1000 + ENEMY_ENTRY_TIME + 1000 * DEATH_TIME - realOffset * 1000);
}

export const runCombat = async () => {
    const { log, start_hp } = store.getState().combat.challengeBossNext ?
        await callChallengeBoss({}).catch(() => generateMockCombat()) :
        generateMockCombat();
    createCombatTimeouts(log, start_hp, log[log.length - 1].time);
};