import { CombatSkill } from "../CombatSkill";

export abstract class WaterSkill extends CombatSkill {
    public static readonly HEALING_SPRING_ID = WaterSkill.WATER_SKILL_START + 1;
    public static readonly REJUVENATION_ID = WaterSkill.WATER_SKILL_START + 2;
    public static readonly FREEZE_ID = WaterSkill.WATER_SKILL_START + 3;
    public static readonly CHILL_ID = WaterSkill.WATER_SKILL_START + 4;
    public static readonly FROSTBITE_ID = WaterSkill.WATER_SKILL_START + 5;
}