import { BossLog, callChallengeBoss, callUpdate } from "../api/ApiObjects";
import { store } from "../redux/store";
import { setCombatAction, setDamage, startCombat, endCombat, setReward, clearChallengeBoss, setChallengeBoss } from "../redux/combat/actions";
import { ENTER_TIME, DEATH_TIME } from "./EnemyDisplay";
import { setMana, setPlayerInfo, setManaRate } from "../redux/player/actions";
import { getLocationInfo } from "./locationInfo";

export const DEFAULT_ACTION_TIME = 2.4;
export const COMBATS_PER_MIN = 5;

const splitLog = (log: BossLog[]): { playerLog: BossLog[], enemyLog: BossLog[] } => {
    return { playerLog: log.filter(v => !v.toPlayer), enemyLog: log.filter(v => v.toPlayer) };
};

const DAMAGE_RANGE = 0.1;
const HP_RANGE = 0.3;

const fuzzNumber = (initial: number, range: number): number => {
    return initial * (1.0 - range + Math.random() * range * 2);
}

const generateMockCombat = (): { log: BossLog[], start_hp: number } => {
    const playerInfo = store.getState().player;

    const damagePerAttack = playerInfo.attack * DEFAULT_ACTION_TIME / 60;
    const startHp = fuzzNumber(getLocationInfo(playerInfo.dungeon, playerInfo.floor).enemyHp, HP_RANGE);
    let combatLog: BossLog[] = [];
    let enemyHp: number = startHp;
    let toNextAttack: number = 1000 * DEFAULT_ACTION_TIME / 2;
    let millisecondsElapsed = 0;
    while (enemyHp > 0) {
        let logElem: BossLog;

        if (Math.random() * 100 < playerInfo.crit_rate) {
            logElem = {
                time: 0,
                damageDealt: damagePerAttack * playerInfo.crit_dmg,
                toPlayer: false,
                remainingHp: playerInfo.hp,
                bossHp: 0,
                details: { message: "Critical hit!" }
            };
        } else {
            logElem = {
                time: 0,
                damageDealt: damagePerAttack,
                toPlayer: false,
                remainingHp: playerInfo.hp,
                bossHp: 0,
                details: null
            }
        }
        millisecondsElapsed += toNextAttack;
        toNextAttack = 1000 * DEFAULT_ACTION_TIME;
        logElem.time = millisecondsElapsed / 1000;
        logElem.damageDealt = fuzzNumber(logElem.damageDealt, DAMAGE_RANGE);
        enemyHp -= logElem.damageDealt;
        logElem.bossHp = enemyHp;
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
                type: "ATTACK"
            }, isPlayer ? "PLAYER" : "ENEMY"));
        }, ENEMY_ENTRY_TIME + startAnimation * 1000 - secondOffset * 1000);
        // Create timeout to clear animation
        setTimeout(() => {
            store.dispatch(setCombatAction({
                time: DEFAULT_ACTION_TIME,
                startTime: Date.now(),
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
    console.log("Offsets: ", secondOffset, log[log.length - 1].time, realOffset);

    // Add timeouts for animations and damage
    createActorTimeouts(playerLog, true, realOffset);
    createActorTimeouts(enemyLog, false, realOffset);

    setTimeout(() => {
        if (store.getState().combat.actions.enemy.type === "ENTERING") {
            let time = enemyLog.length ? enemyLog[0].time : DEFAULT_ACTION_TIME;
            store.dispatch(setCombatAction({
                time: time,
                startTime: Date.now(),
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
            type: "DYING"
        }, playerDead ? "PLAYER" : "ENEMY"));
        // At end of combat, get rewards
        if (!playerDead) {
            const _combatStart = store.getState().combat.combatStart;
            const update = await callUpdate({});
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
                store.dispatch(setPlayerInfo({ tickets: update.result.tickets }));
                if (store.getState().player.manaPerMin !== update.result.per_min) {
                    store.dispatch(setManaRate(update.result.per_min));
                }
            }
        }
    }, log[log.length - 1].time * 1000 + ENEMY_ENTRY_TIME - realOffset * 1000);

    setTimeout(() => {
        // After death, end combat and start a new one after 12s from very start of combat
        setTimeout(() => {
            if (chainNext) {
                runCombat();
            }
        }, store.getState().combat.combatStart + (60 / COMBATS_PER_MIN) * 1000 - Date.now());
        store.dispatch(endCombat());
    }, log[log.length - 1].time * 1000 + ENEMY_ENTRY_TIME + 1000 * DEATH_TIME - realOffset * 1000);
}

export const runCombat = async () => {
    const { log, start_hp } = store.getState().combat.challengeBossNext ?
        await callChallengeBoss({}) :
        generateMockCombat();
    createCombatTimeouts(log, start_hp, log[log.length - 1].time);
};