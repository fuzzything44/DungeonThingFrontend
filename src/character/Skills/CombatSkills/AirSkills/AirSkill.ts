import { CombatSkill } from "../CombatSkill";

export abstract class AirSkill extends CombatSkill {
    public static readonly FORCEFUL_GUST_ID = AirSkill.AIR_SKILL_START + 1;
    public static readonly TWISTING_WINDS_ID = AirSkill.AIR_SKILL_START + 2;
    public static readonly RIDE_THE_BREEZE_ID = AirSkill.AIR_SKILL_START + 3;
    public static readonly TODO_AIR_ID = AirSkill.AIR_SKILL_START + 4; // TODO: figure out this skill
    public static readonly GALE_WINDS_ID = AirSkill.AIR_SKILL_START + 5;
}