import { CombatSkill } from "../CombatSkill";

export abstract class EarthSkill extends CombatSkill {
    public static readonly ROCK_WALL_ID = EarthSkill.EARTH_SKILL_START + 1;
    public static readonly CLAY_ARMOR_ID = EarthSkill.EARTH_SKILL_START + 2;
    public static readonly STRENGTH_OF_MOUNTAIN_ID = EarthSkill.EARTH_SKILL_START + 3;
    public static readonly TODO_EARTH_ID = EarthSkill.EARTH_SKILL_START + 4; // TODO: figure out this skill
    public static readonly IRON_SKIN_ID = EarthSkill.EARTH_SKILL_START + 5;
}