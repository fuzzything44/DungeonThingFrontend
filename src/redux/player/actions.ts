import { SetPlayerInfoAction, SET_PLAYER_INFO, SetManaAction, SET_MANA, SetManaRateAction, SET_MANA_RATE, SetAttributeLevelAction, SET_ATTRIBUTE_LEVEL, SetSkillsAction, SET_SKILLS, SetUsedSkillsAction, SET_USED_SKILLS } from "./types";
import { StatusResponse, SkillInfo } from "../../api/ApiObjects";

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

export function setSkills(skills: SkillInfo[]): SetSkillsAction {
    return { type: SET_SKILLS, skills: skills };
}

export function setUsedSkills(skills: SkillInfo[]): SetUsedSkillsAction {
    return { type: SET_USED_SKILLS, skills: skills };
}