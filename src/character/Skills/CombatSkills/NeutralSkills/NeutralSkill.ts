import { CombatSkill } from "../CombatSkill";

export abstract class NeutralSkill extends CombatSkill {
    public static readonly CRITICAL_STRIKE_ID = NeutralSkill.NEUTRAL_SKILL_START + 1;
    public static readonly STRONG_BLOW_ID = NeutralSkill.NEUTRAL_SKILL_START + 2;
}