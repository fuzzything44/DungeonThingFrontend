import { StatusResponse } from "../../api/ApiObjects";
import { ATTRIBUTES } from "../../character/Attribute";

export type PlayerState = StatusResponse & {
    mana: number;
    manaPerMin: number;
    attributes: { [T in keyof typeof ATTRIBUTES] : number };
};


export const SET_PLAYER_INFO = "SET_PLAYER_INFO";
export type SetPlayerInfoAction = Partial<StatusResponse> & {
    type: typeof SET_PLAYER_INFO;
}

export const SET_MANA = "SET_MANA";
export interface SetManaAction {
    type: typeof SET_MANA;
    mana: number;
}

export const SET_MANA_RATE = "SET_MANA_RATE";
export interface SetManaRateAction {
    type: typeof SET_MANA_RATE;
    rate: number;
}

export const SET_ATTRIBUTE_LEVEL = "SET_ATTRIBUTE_LEVEL";
export interface SetAttributeLevelAction {
    type: typeof SET_ATTRIBUTE_LEVEL;
    attribute: keyof typeof ATTRIBUTES;
    level: number;
}

export type PlayerAction = SetPlayerInfoAction | SetManaAction | SetManaRateAction | SetAttributeLevelAction;