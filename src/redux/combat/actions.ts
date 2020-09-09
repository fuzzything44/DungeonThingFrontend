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
    SET_DAMAGE,

    SetCombatRewardAction,
    SET_COMBAT_REWARD,
    SetChallengeBossAction,
    SET_CHALLENGE_BOSS,
    ClearChallengeBossAction,
    CLEAR_CHALLENGE_BOSS,
    SetAutoChallengeBossAction,
    ClearAutoChallengeBossAction,
    SET_AUTO_CHALLENGE,
    CLEAR_AUTO_CHALLENGE
} from "./types";
import { BossLog, BossReward } from "../../api/ApiObjects";

export function startCombat(playerHp: number, enemyHp: number, isBoss: boolean, log: BossLog[], timeOffset: number): StartCombatAction {
    return {
        type: START_COMBAT,
        playerHp: playerHp,
        enemyHp: enemyHp,
        enemyType: isBoss ? "BOSS" : "REGULAR",
        log: log,
        timeOffset: timeOffset
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

export function setReward(rewards: BossReward[]): SetCombatRewardAction {
    return { type: SET_COMBAT_REWARD, rewards: rewards };
}

export function setChallengeBoss(): SetChallengeBossAction {
    return { type: SET_CHALLENGE_BOSS };
}

export function clearChallengeBoss(): ClearChallengeBossAction {
    return { type: CLEAR_CHALLENGE_BOSS };
}

export function setAutoChallenge(): SetAutoChallengeBossAction {
    return { type: SET_AUTO_CHALLENGE };
}

export function clearAutoChallenge(): ClearAutoChallengeBossAction {
    return { type: CLEAR_AUTO_CHALLENGE };
}