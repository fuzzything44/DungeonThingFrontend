import { CombatState, CombatAction, CHALLENGE_BOSS, SET_COMBAT_ACTION, START_COMBAT, END_COMBAT, SET_DAMAGE } from "./types";

const DEFAULT_ACTION_TIME = 60 / 25;
const initialState: CombatState = {
    playerHp: { current: 1, max: 1 },
    playerDamage: [],
    enemyHp: { current: 1, max: 1 },
    enemyDamage: [],
    enemyType: "NONE",
    challengeBossNext: false,
    actions: {
        player: { time: DEFAULT_ACTION_TIME, startTime: Date.now(), type: "NONE" },
        enemy: { time: DEFAULT_ACTION_TIME, startTime: Date.now(), type: "NONE" }
    },
    actionCallbacks: [],
    fullLog: [],
    combatStart: 0
}

export function combatReducer(state = initialState, action: CombatAction): CombatState {
    switch (action.type) {
        case START_COMBAT:
            return {
                ...state,
                playerHp: { current: action.playerHp, max: action.playerHp },
                playerDamage: [],
                enemyHp: { current: action.enemyHp, max: action.enemyHp },
                enemyDamage: [],
                enemyType: action.enemyType,
                actions: {
                    player: { time: DEFAULT_ACTION_TIME, startTime: Date.now(), type: "NONE" },
                    enemy: { time: DEFAULT_ACTION_TIME, startTime: Date.now(), type: "ENTERING" }
                },
                fullLog: action.log,
                combatStart: Date.now()
            }
        case END_COMBAT:
            return {
                ...state,
                enemyType: "NONE"
            }
        case CHALLENGE_BOSS:
            return {
                ...state,
                challengeBossNext: true
            };
        case SET_COMBAT_ACTION:
            return {
                ...state,
                actions: {
                    player: action.actor === "PLAYER" ? action.action : state.actions.player,
                    enemy: action.actor === "ENEMY" ? action.action : state.actions.enemy
                }
            }
        case SET_DAMAGE:
            let newPlayerHp = state.playerHp.current - (action.target === "PLAYER" ? action.damage : 0);
            let newEnemyHp = state.enemyHp.current - (action.target === "ENEMY" ? action.damage : 0);
            let newPlayerDamage = [...state.playerDamage];
            let newEnemyDamage = [...state.enemyDamage];
            if (action.target === "PLAYER") {
                newPlayerDamage.push({ startTime: Date.now(), amount: action.damage });
            } else {
                newEnemyDamage.push({ startTime: Date.now(), amount: action.damage });
            }
            return {
                ...state,
                playerDamage: newPlayerDamage,
                enemyDamage: newEnemyDamage,
                playerHp: { ...state.playerHp, current: newPlayerHp },
                enemyHp: { ...state.enemyHp, current: newEnemyHp }
            }
        default:
            return state;
    }
}