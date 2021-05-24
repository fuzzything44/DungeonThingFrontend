import { SkillInfo } from "../../api/ApiObjects";
import { CombatSkill } from "./CombatSkills/CombatSkill";
import { NeutralSkill } from "./CombatSkills/NeutralSkills/NeutralSkill";
import { CriticalStrike } from "./CombatSkills/NeutralSkills/CriticalStrike";
import { StrongBlow } from "./CombatSkills/NeutralSkills/StrongBlow";
import { NoOpSkill } from "./CombatSkills/NeutralSkills/NoOpSkill";

export enum SkillElement {
    NEUTRAL,
    FIRE,
    WATER,
    EARTH,
    AIR
}

interface SkillData {
    name: string;
    desc: string;
    elem: SkillElement;
    uses: number;
    charge: number;
    image: string;
    maxLvl: number;
    skill: CombatSkill;
}

export const BLANK_SKILL: SkillInfo = { skill_id: 0, skill_level: 0 };

export const getSkillData = (id: number, level: number): SkillData => {
    switch (id) {
        case NeutralSkill.CRITICAL_STRIKE_ID:
            return {
                name: "Critical Strike",
                desc: `Attack with a ${[25, 50, 50][level]}% boost to critical hit chance`,
                elem: SkillElement.NEUTRAL,
                uses: [1, 1, 2][level],
                charge: 4,
                image: require("../../images/skills/neutral/critical_strike.png"),
                maxLvl: 2,
                skill: new CriticalStrike(level)
            };
        case NeutralSkill.STRONG_BLOW_ID:
            return {
                name: "Strong Blow",
                desc: "Attack for 150% of normal damage",
                elem: SkillElement.NEUTRAL,
                uses: [1, 2, 2][level],
                charge: [5, 5, 4][level],
                image: require("../../images/skills/neutral/strong_blow.png"),
                maxLvl: 2,
                skill: new StrongBlow(level)
            };
        default:
            return {
                name: "No Skill",
                desc: "No skill is equipped here ",
                elem: SkillElement.NEUTRAL,
                uses: 0,
                charge: 0,
                image: require("../../images/default.png"),
                maxLvl: 0,
                skill: new NoOpSkill()
            };
    }
}