import { CombatSkill } from "../CombatSkill";

export abstract class FireSkill extends CombatSkill {
    public static readonly INCINERATE_ID = FireSkill.FIRE_SKILL_START + 1;
    public static readonly BURN_ID = FireSkill.FIRE_SKILL_START + 2;
    public static readonly FAN_THE_FLAMES_ID = FireSkill.FIRE_SKILL_START + 3;
    public static readonly TODO_FIRE_ID = FireSkill.FIRE_SKILL_START + 4; // TODO: this will do things, maybe
    public static readonly CHAR_ID = FireSkill.FIRE_SKILL_START + 5;
}