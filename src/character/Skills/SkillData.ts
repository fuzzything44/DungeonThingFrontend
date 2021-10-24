import { SkillInfo } from "../../api/ApiObjects";
import { CombatSkill } from "./CombatSkills/CombatSkill";
import { NeutralSkill } from "./CombatSkills/NeutralSkills/NeutralSkill";
import { CriticalStrike } from "./CombatSkills/NeutralSkills/CriticalStrike";
import { StrongBlow } from "./CombatSkills/NeutralSkills/StrongBlow";
import { NoOpSkill } from "./CombatSkills/NeutralSkills/NoOpSkill";
import { WaterSkill } from "./CombatSkills/WaterSkills/WaterSkill";
import { HealingSpring } from "./CombatSkills/WaterSkills/HealingSpring";
import { Rejuvenation } from "./CombatSkills/WaterSkills/Rejuvenation";
import { Freeze } from "./CombatSkills/WaterSkills/Freeze";
import { Chill } from "./CombatSkills/WaterSkills/Chill";
import { Frostbite } from "./CombatSkills/WaterSkills/Frostbite";
import { EarthSkill } from "./CombatSkills/EarthSkills/EarthSkill";
import { RockWall } from "./CombatSkills/EarthSkills/RockWall";
import { ClayArmor } from "./CombatSkills/EarthSkills/ClayArmor";
import { StrengthOfMountain } from "./CombatSkills/EarthSkills/StrengthOfMountain";
import { TODOEarth } from "./CombatSkills/EarthSkills/TODOEarth";
import { IronSkin } from "./CombatSkills/EarthSkills/IronSkin";
import { AirSkill } from "./CombatSkills/AirSkills/AirSkill";
import { ForcefulGust } from "./CombatSkills/AirSkills/ForcefulGust";
import { TwistingWinds } from "./CombatSkills/AirSkills/TwistingWinds";
import { RideTheBreeze } from "./CombatSkills/AirSkills/RideTheBreeze";
import { TODOAir } from "./CombatSkills/AirSkills/TODOAir";
import { GaleWinds } from "./CombatSkills/AirSkills/GaleWinds";
import { FireSkill } from "./CombatSkills/FireSkills/FireSkill";
import { Incinerate } from "./CombatSkills/FireSkills/Incinerate";
import { Burn } from "./CombatSkills/FireSkills/Burn";
import { FanTheFlames } from "./CombatSkills/FireSkills/FanTheFlames";
import { TODOFire } from "./CombatSkills/FireSkills/TODOFire";
import { Char } from "./CombatSkills/FireSkills/Char";

// MUST be same order as backend for elements to match up.
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

const SKILL_LEVEL_NAMES: string[] = ["Basic", "Trained", "Advanced", "Masterful"];
SKILL_LEVEL_NAMES[-1] = "";

export const BLANK_SKILL: SkillInfo = { skill_id: 0, skill_level: 0 };

export const getSkillData = (id: number, level: number): SkillData => {
    switch (id) {
        // Neutral Skills
        case NeutralSkill.CRITICAL_STRIKE_ID:
            return {
                name: "Critical Strike - " + SKILL_LEVEL_NAMES[level],
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
                name: "Strong Blow - " + SKILL_LEVEL_NAMES[level],
                desc: "Attack for 150% of normal damage",
                elem: SkillElement.NEUTRAL,
                uses: [1, 2, 2][level],
                charge: [5, 5, 4][level],
                image: require("../../images/skills/neutral/strong_blow.png"),
                maxLvl: 2,
                skill: new StrongBlow(level)
            };
        // Fire skills
        case FireSkill.INCINERATE_ID:
            return {
                name: "Incinerate - " + SKILL_LEVEL_NAMES[level],
                desc: `Attack with +${[200, 200, 300, 300][level]}% damage, and deal an additional ${[25, 25, 25, 20][level]}% of that hit's damage to yourself`,
                elem: SkillElement.FIRE,
                uses: [1, 2, 2, 2][level],
                charge: 4,
                image: require("../../images/skills/fire/incinerate.png"),
                maxLvl: 3,
                skill: new Incinerate(level)
            };
        case FireSkill.BURN_ID:
            return {
                name: "Burn - " + SKILL_LEVEL_NAMES[level],
                desc: `Burn your enemy, dealing ${[7.5, 10, 10, 10][level]}% of attack every second. This lasts for ${[30, 30, 30, 40][level]} seconds.`,
                elem: SkillElement.FIRE,
                uses: [1, 1, 2, 3][level],
                charge: 4,
                image: require("../../images/skills/fire/burn.png"),
                maxLvl: 3,
                skill: new Burn(level)
            };
        case FireSkill.FAN_THE_FLAMES_ID:
            return {
                name: "Fan the Flames - " + SKILL_LEVEL_NAMES[level],
                desc: `Attack with +25% damage. This damage is increased by ${[50, 50, 50, 75][level]}% for each previous use of this skill this combat.`,
                elem: SkillElement.FIRE,
                uses: [2, 4, 6, 6][level],
                charge: 4,
                image: require("../../images/skills/fire/fan_the_flames.png"),
                maxLvl: 3,
                skill: new FanTheFlames(level)
            };
        case FireSkill.TODO_FIRE_ID:
            return {
                name: "TODO Fire - " + SKILL_LEVEL_NAMES[level],
                desc: `Does nothing. It's like every water skill!`,
                elem: SkillElement.FIRE,
                uses: [0][level],
                charge: 999,
                image: require("../../images/skills/fire/todo_fire.png"),
                maxLvl: 0,
                skill: new TODOFire(level)
            };
        case FireSkill.CHAR_ID:
            return {
                name: "Char - " + SKILL_LEVEL_NAMES[level],
                desc: `Deal ${[2.5, 5, 5, 5][level]}% of attack per second. This lasts until the end of combat.`,
                elem: SkillElement.FIRE,
                uses: [1, 1, 2, 3][level],
                charge: 4,
                image: require("../../images/skills/fire/char.png"),
                maxLvl: 3,
                skill: new Char(level)
            };
        // Water Skills
        case WaterSkill.HEALING_SPRING_ID:
            return {
                name: "Healing Spring - " + SKILL_LEVEL_NAMES[level],
                desc: `Recover ${[15, 25, 30][level]}% of your max HP`,
                elem: SkillElement.WATER,
                uses: [1, 2, 2][level],
                charge: 3,
                image: require("../../images/skills/water/healing_spring.png"),
                maxLvl: 2,
                skill: new HealingSpring(level)
            };
        case WaterSkill.REJUVENATION_ID:
            return {
                name: "Rejuvenation - " + SKILL_LEVEL_NAMES[level],
                desc: `Recover HP equal to ${[10, 15, 15, 20][level]}% of your attack`,
                elem: SkillElement.WATER,
                uses: [1, 1, 2, 3][level],
                charge: 3,
                image: require("../../images/skills/water/rejuvenation.png"),
                maxLvl: 3,
                skill: new Rejuvenation(level)
            };
        case WaterSkill.FREEZE_ID:
            return {
                name: "Freeze - " + SKILL_LEVEL_NAMES[level],
                desc: `Stop all enemy action for ${[3, 5, 5, 7][level]} seconds`,
                elem: SkillElement.WATER,
                uses: [1, 1, 2, 2][level],
                charge: 4,
                image: require("../../images/skills/water/freeze.png"),
                maxLvl: 3,
                skill: new Freeze(level)
            };
        case WaterSkill.CHILL_ID:
            return {
                name: "Chill - " + SKILL_LEVEL_NAMES[level],
                desc: `Slow the enemy's actions by ${[20, 20, 30, 40][level]}% for 30 seconds`,
                elem: SkillElement.WATER,
                uses: [1, 2, 3, 3][level],
                charge: 4,
                image: require("../../images/skills/water/chill.png"),
                maxLvl: 3,
                skill: new Chill(level)
            };
        case WaterSkill.FROSTBITE_ID:
            return {
                name: "Frostbite - " + SKILL_LEVEL_NAMES[level],
                desc: `Slow the enemy's action rate by ${[5, 7, 7, 10][level]}%. This lasts until the end of combat. Stacks multiplicatively.`,
                elem: SkillElement.WATER,
                uses: [1, 1, 2, 3][level],
                charge: 4,
                image: require("../../images/skills/water/frostbite.png"),
                maxLvl: 3,
                skill: new Frostbite(level)
            };
        // Earth Skills
        case EarthSkill.ROCK_WALL_ID:
            return {
                name: "Rock Wall - " + SKILL_LEVEL_NAMES[level],
                desc: `Reduces the damage taken from the next attack by ${[50, 75, 100, 100][level]}%.`,
                elem: SkillElement.EARTH,
                uses: [2, 2, 3, 4][level],
                charge: 2,
                image: require("../../images/skills/earth/rock_wall.png"),
                maxLvl: 3,
                skill: new RockWall(level)
            };
        case EarthSkill.CLAY_ARMOR_ID:
            return {
                name: "Clay Armor - " + SKILL_LEVEL_NAMES[level],
                desc: `Gain ${[25, 35, 50, 75][level]}% of attack as flat damage reduction for ${[15, 15, 20, 20][level]} seconds.`,
                elem: SkillElement.EARTH,
                uses: [1, 1, 2, 3][level],
                charge: 4,
                image: require("../../images/skills/earth/clay_armor.png"),
                maxLvl: 3,
                skill: new ClayArmor(level)
            };
        case EarthSkill.STRENGTH_OF_MOUNTAIN_ID:
            return {
                name: "Strength of the Mountain - " + SKILL_LEVEL_NAMES[level],
                desc: `Reduce damage taken by ${[25, 33, 40][level]}% for ${[15, 15, 20][level]} seconds. Applied before Clay Armor.`,
                elem: SkillElement.EARTH,
                uses: [1, 1, 2][level],
                charge: 3,
                image: require("../../images/skills/earth/strength_mountain.png"),
                maxLvl: 2,
                skill: new StrengthOfMountain(level)
            };
        case EarthSkill.TODO_EARTH_ID:
            return {
                name: "TODO Earth - " + SKILL_LEVEL_NAMES[level],
                desc: `This skill shouldn't be possible to obtain`,
                elem: SkillElement.EARTH,
                uses: [0][level],
                charge: 999,
                image: require("../../images/skills/earth/todo_earth.png"),
                maxLvl: 0,
                skill: new TODOEarth(level)
            };
        case EarthSkill.IRON_SKIN_ID:
            return {
                name: "Iron Skin - " + SKILL_LEVEL_NAMES[level],
                desc: `Reduce damage taken by ${[10, 15, 15, 15][level]}% until the end of combat. Stacks multiplicatively.`,
                elem: SkillElement.EARTH,
                uses: [1, 1, 2, 3][level],
                charge: 4,
                image: require("../../images/skills/earth/iron_skin.png"),
                maxLvl: 3,
                skill: new IronSkin(level)
            };
        // Air skills
        case AirSkill.FORCEFUL_GUST_ID:
            return {
                name: "Forceful Gust - " + SKILL_LEVEL_NAMES[level],
                desc: `Increases critical hit rate by ${[10, 20, 20][level]}% for ${[15, 20, 30][level]} seconds.`,
                elem: SkillElement.AIR,
                uses: [1, 1, 2][level],
                charge: 4,
                image: require("../../images/skills/air/forceful_gust.png"),
                maxLvl: 2,
                skill: new ForcefulGust(level)
            };
        case AirSkill.TWISTING_WINDS_ID:
            return {
                name: "Twisting Winds - " + SKILL_LEVEL_NAMES[level],
                desc: `Gain ${[10, 20, 25, 30][level]}% dodge chance for ${[20, 20, 20, 30][level]} seconds.`,
                elem: SkillElement.AIR,
                uses: [1, 1, 2, 3][level],
                charge: 4,
                image: require("../../images/skills/air/twisting_winds.png"),
                maxLvl: 3,
                skill: new TwistingWinds(level)
            };
        case AirSkill.RIDE_THE_BREEZE_ID:
            return {
                name: "Ride the Breeze - " + SKILL_LEVEL_NAMES[level],
                desc: `Increase attack speed by ${[10, 15, 15, 20][level]}% for ${[20, 30, 30, 45][level]} seconds.`,
                elem: SkillElement.AIR,
                uses: [1, 2, 3, 3][level],
                charge: 3,
                image: require("../../images/skills/air/ride_breeze.png"),
                maxLvl: 3,
                skill: new RideTheBreeze(level)
            };
        case AirSkill.TODO_AIR_ID:
            return {
                name: "TODO Air - " + SKILL_LEVEL_NAMES[level],
                desc: `Does nothing. Really! In fact, you shouldn't have this at all.`,
                elem: SkillElement.AIR,
                uses: [0][level],
                charge: 999,
                image: require("../../images/skills/air/todo_air.png"),
                maxLvl: 0,
                skill: new TODOAir(level)
            };
        case AirSkill.GALE_WINDS_ID:
            return {
                name: "Gale Winds - " + SKILL_LEVEL_NAMES[level],
                desc: `Increase critical hit rate by ${[5, 7, 7, 10][level]}% until the end of combat.`,
                elem: SkillElement.AIR,
                uses: [1, 1, 2, 3][level],
                charge: 4,
                image: require("../../images/skills/air/gale_winds.png"),
                maxLvl: 3,
                skill: new GaleWinds(level)
            };
        // Default, for the blank skill
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