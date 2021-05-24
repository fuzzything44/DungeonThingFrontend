import { CombatState, CombatAction, CHALLENGE_BOSS, SET_COMBAT_ACTION, START_COMBAT, END_COMBAT, SET_DAMAGE, SET_COMBAT_REWARD, SET_CHALLENGE_BOSS, CLEAR_CHALLENGE_BOSS, SET_AUTO_CHALLENGE, CLEAR_AUTO_CHALLENGE } from "./types";

const DEFAULT_ACTION_TIME = 60 / 25;
const initialState: CombatState = {
    playerHp: { current: 1, max: 1 },
    playerDamage: [],
    enemyHp: { current: 1, max: 1 },
    enemyDamage: [],
    enemyType: "NONE",
    lastType: "REGULAR",
    challengeBossNext: false,
    autoChallengeEnabled: false,
    actions: {
        player: { time: DEFAULT_ACTION_TIME, startTime: Date.now(), type: "NONE", skillCharge: 0 },
        enemy: { time: DEFAULT_ACTION_TIME, startTime: Date.now(), type: "NONE", skillCharge: 0 }
    },
    fullLog: [],
    combatStart: 0,
    rewards: undefined
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
                lastType: action.enemyType,
                actions: {
                    player: { time: DEFAULT_ACTION_TIME, startTime: Date.now(), type: "NONE", skillCharge: 0 },
                    enemy: { time: DEFAULT_ACTION_TIME, startTime: Date.now(), type: "ENTERING", skillCharge: 0 }
                },
                fullLog: action.log,
                combatStart: Date.now() - action.timeOffset * 1000,
                rewards: undefined
            }
        case END_COMBAT:
            return {
                ...state,
                lastType: state.enemyType === "NONE" ? "REGULAR" : state.enemyType,
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
                playerHp: { ...state.playerHp, current: Math.max(0, newPlayerHp) },
                enemyHp: { ...state.enemyHp, current: Math.max(0, newEnemyHp) }
            }
        case SET_COMBAT_REWARD:
            return {
                ...state,
                rewards: action.rewards
            }
        case SET_CHALLENGE_BOSS:
            return {
                ...state,
                challengeBossNext: true
            }
        case CLEAR_CHALLENGE_BOSS:
            return {
                ...state,
                challengeBossNext: false || state.autoChallengeEnabled
            }
        case SET_AUTO_CHALLENGE:
            return {
                ...state,
                challengeBossNext: true,
                autoChallengeEnabled: true
            }
        case CLEAR_AUTO_CHALLENGE:
            if (state.autoChallengeEnabled) {
                return {
                    ...state,
                    challengeBossNext: false,
                    autoChallengeEnabled: false
                }
            } else {
                return state;
            }
        default:
            return state;
    }
}