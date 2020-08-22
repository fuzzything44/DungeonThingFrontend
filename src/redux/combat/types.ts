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
    actions: {
        player: CombatActorAction;
        enemy: CombatActorAction;
    };
    actionCallbacks: number[];
    challengeBossNext: boolean;
}

export type ActorNames = "PLAYER" | "ENEMY";

export const START_COMBAT = "START_COMBAT";
export interface StartCombatAction {
    type: typeof START_COMBAT;
    playerHp: number;
    enemyHp: number;
    enemyType: CombatState['enemyType']
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
export interface SetDamageAction  {
    type: typeof SET_DAMAGE;
    damage: number;
    target: ActorNames
}

export type CombatAction =
    StartCombatAction |
    EndCombatAction |
    ChallengeBossAction |
    SetCombatActionAction |
    SetDamageAction;
    