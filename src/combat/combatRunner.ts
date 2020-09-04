import { BossLog, callChallengeBoss } from "../api/ApiObjects";
import { store } from "../redux/store";
import { setCombatAction, setDamage, startCombat, endCombat } from "../redux/combat/actions";
import { ENTER_TIME, DEATH_TIME } from "./EnemyDisplay";

export const DEFAULT_ACTION_TIME = 2.4;

const splitLog = (log: BossLog[]): { playerLog: BossLog[], enemyLog: BossLog[] } => {
    return { playerLog: log.filter(v => !v.toPlayer), enemyLog: log.filter(v => v.toPlayer) };
};

const DAMAGE_RANGE = 0.1;

const generateMockCombat = (): { combatLog: BossLog[], startHp: number } => {
    const playerInfo = store.getState().player;

    const damagePerAttack = playerInfo.attack * DEFAULT_ACTION_TIME / 60;
    const startHp = 25;
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
                details: { }
            }
        }
        millisecondsElapsed += toNextAttack;
        toNextAttack = 1000 * DEFAULT_ACTION_TIME;
        logElem.time = millisecondsElapsed / 1000;
        logElem.damageDealt *= (1.0 - DAMAGE_RANGE + Math.random() * DAMAGE_RANGE * 2);
        enemyHp -= logElem.damageDealt;
        combatLog.push(logElem);
    }

    return {
        combatLog: combatLog,
        startHp: startHp
    };
}

const createActorTimeouts = (log: BossLog[], isPlayer: boolean) => {
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
        }, ENEMY_ENTRY_TIME + startAnimation * 1000);
        // Create timeout to clear animation
        setTimeout(() => {
            store.dispatch(setCombatAction({
                time: DEFAULT_ACTION_TIME,
                startTime: Date.now(),
                type: "NONE"
            }, isPlayer ? "PLAYER" : "ENEMY"));
        }, ENEMY_ENTRY_TIME + endAnimation * 1000);

        // Create timeout for damage
        setTimeout(() => {
            store.dispatch(setDamage(log[i].damageDealt, isPlayer ? "ENEMY" : "PLAYER"));
        }, ENEMY_ENTRY_TIME + log[i].time * 1000);
    }
}
// How much earlier do we show animations than damage?
const ANIMATION_OFFSET = 0.5;
const ENEMY_ENTRY_TIME = ENTER_TIME * 1000;
export const runCombat = async () => {
    const { combatLog, startHp } = store.getState().combat.challengeBossNext ? {combatLog: (await callChallengeBoss({})).log, startHp: 1} : generateMockCombat();
    const { playerLog, enemyLog } = splitLog(combatLog);

    // Start the combat
    store.dispatch(startCombat(store.getState().player.hp, startHp, false, combatLog));

    // Add timeouts for animations and damage
    createActorTimeouts(playerLog, true);
    createActorTimeouts(enemyLog, false);

    setTimeout(() => {
        if (store.getState().combat.actions.enemy.type === "ENTERING") {
            let time = enemyLog.length ? enemyLog[0].time : DEFAULT_ACTION_TIME;
            store.dispatch(setCombatAction({
                time: time,
                startTime: Date.now(),
                type: "NONE"
            }, "ENEMY"));
        }
    }, ENEMY_ENTRY_TIME);

    setTimeout(() => {
        const lastLog = combatLog[combatLog.length - 1];
        let playerDead: boolean = lastLog.remainingHp <= 0 || lastLog.bossHp > 0;
        store.dispatch(setCombatAction({
            time: DEATH_TIME,
            startTime: Date.now(),
            type: "DYING"
        }, playerDead ? "PLAYER" : "ENEMY"));
    }, combatLog[combatLog.length - 1].time * 1000 + ENEMY_ENTRY_TIME);

    setTimeout(() => {
        store.dispatch(endCombat());
        runCombat();
    }, combatLog[combatLog.length - 1].time * 1000 + ENEMY_ENTRY_TIME + 1000 * DEATH_TIME);

};