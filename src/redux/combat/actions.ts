import {
    ChallengeBossAction,
    CHALLENGE_BOSS,
    SetCombatActionAction,
    SET_COMBAT_ACTION,
    CombatActorAction,
    StartCombatAction,
    START_COMBAT,
    EndCombatAction,
    END_COMBAT,
    ActorNames,
    SetDamageAction,
    SET_DAMAGE
} from "./types";

export function startCombat(playerHp: number, enemyHp: number, isBoss: boolean): StartCombatAction {
    return {
        type: START_COMBAT,
        playerHp: playerHp,
        enemyHp: enemyHp,
        enemyType: isBoss ? "BOSS" : "REGULAR"
    };
}

export function endCombat(): EndCombatAction {
    return { type: END_COMBAT };
}

export function challengeBoss(): ChallengeBossAction {
    return { type: CHALLENGE_BOSS };
}

export function setCombatAction(action: CombatActorAction, actor: ActorNames): SetCombatActionAction {
    return { type: SET_COMBAT_ACTION, action: action, actor: actor };
}

export function setDamage(amount: number, target: ActorNames): SetDamageAction {
    return { type: SET_DAMAGE, damage: amount, target: target };
}