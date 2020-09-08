import { BossLog, BossReward } from "../../api/ApiObjects";

export type CombatActorAction = { time: number, startTime: number } & ({
    type: "NONE" | "ENTERING" | "DYING" | "ATTACK" | "CRITICAL"
} | {
    type: "SKILL";
    skillName: string;
})

export interface HP {
    max: number;
    current: number;
}

export interface Damage {
    startTime: number;
    amount: number;
}
export interface CombatState {
    playerHp: HP;
    playerDamage: Damage[];
    enemyHp: HP;
    enemyDamage: Damage[];
    enemyType: "REGULAR" | "BOSS" | "NONE";
    lastType: "REGULAR" | "BOSS";
    actions: {
        player: CombatActorAction;
        enemy: CombatActorAction;
    };
    challengeBossNext: boolean;
    fullLog: BossLog[];
    combatStart: number;
    rewards: BossReward[] | undefined;
}

export type ActorNames = "PLAYER" | "ENEMY";

export const START_COMBAT = "START_COMBAT";
export interface StartCombatAction {
    type: typeof START_COMBAT;
    playerHp: number;
    enemyHp: number;
    enemyType: Exclude<CombatState['enemyType'], "NONE">;
    log: BossLog[];
    timeOffset: number;
}

export const END_COMBAT = "END_COMBAT";
export interface EndCombatAction {
    type: typeof END_COMBAT;
}

export const CHALLENGE_BOSS = "CHALLENGE_BOSS";
export interface ChallengeBossAction {
    type: typeof CHALLENGE_BOSS;
}

export const SET_COMBAT_ACTION = "SET_COMBAT_ACTION";
export interface SetCombatActionAction {
    type: typeof SET_COMBAT_ACTION;
    action: CombatActorAction;
    actor: ActorNames;
}

export const SET_DAMAGE = "SET_DAMAGE";
export interface SetDamageAction {
    type: typeof SET_DAMAGE;
    damage: number;
    target: ActorNames
}

export const SET_COMBAT_REWARD = "SET_COMBAT_REWARD";
export interface SetCombatRewardAction {
    type: typeof SET_COMBAT_REWARD;
    rewards: BossReward[];
}

export const SET_CHALLENGE_BOSS = "SET_CHALLENGE_BOSS";
export interface SetChallengeBossAction {
    type: typeof SET_CHALLENGE_BOSS;
}

export const CLEAR_CHALLENGE_BOSS = "CLEAR_CHALLENGE_BOSS";
export interface ClearChallengeBossAction {
    type: typeof CLEAR_CHALLENGE_BOSS;
}

export type CombatAction =
    StartCombatAction |
    EndCombatAction |
    ChallengeBossAction |
    SetCombatActionAction |
    SetDamageAction |
    SetCombatRewardAction |
    SetChallengeBossAction |
    ClearChallengeBossAction;
    