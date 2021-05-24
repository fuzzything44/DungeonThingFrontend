import { StatusResponse, SkillInfo } from "../../api/ApiObjects";
import { ATTRIBUTES } from "../../character/Attribute";

export type PlayerState = StatusResponse & {
    mana: number;
    manaPerMin: number;
    attributes: { [T in keyof typeof ATTRIBUTES]: number };
    skills: SkillInfo[];
    usedSkills: SkillInfo[];
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

export const SET_SKILLS = "SET_SKILLS";
export interface SetSkillsAction {
    type: typeof SET_SKILLS;
    skills: SkillInfo[]
}

export const SET_USED_SKILLS = "SET_USED_SKILLS";
export interface SetUsedSkillsAction {
    type: typeof SET_USED_SKILLS;
    skills: SkillInfo[]
}

export type PlayerAction =
    SetPlayerInfoAction |
    SetManaAction |
    SetManaRateAction |
    SetAttributeLevelAction |
    SetSkillsAction |
    SetUsedSkillsAction;