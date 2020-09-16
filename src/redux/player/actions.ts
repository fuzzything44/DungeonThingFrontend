import { SetPlayerInfoAction, SET_PLAYER_INFO, SetManaAction, SET_MANA, SetManaRateAction, SET_MANA_RATE, SetAttributeLevelAction, SET_ATTRIBUTE_LEVEL } from "./types";
import { StatusResponse } from "../../api/ApiObjects";

export function setPlayerInfo(response: Partial<StatusResponse>): SetPlayerInfoAction {
    return {
        type: SET_PLAYER_INFO,
        ...response
    };
}

export function setMana(mana: number): SetManaAction {
    return { type: SET_MANA, mana: mana };
}

export function setManaRate(mana: number): SetManaRateAction {
    return { type: SET_MANA_RATE, rate: mana };
}

export function setAttributeLevel(attribute: SetAttributeLevelAction["attribute"], level: number): SetAttributeLevelAction {
    return { type: SET_ATTRIBUTE_LEVEL, attribute: attribute, level: level };
}