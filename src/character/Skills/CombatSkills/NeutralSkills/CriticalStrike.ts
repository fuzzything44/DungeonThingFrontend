import { NeutralSkill } from "./NeutralSkill";
import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { BasicEffect, EffectDuration } from "../../../../combat/CombatSim/Effects/BasicEffect";
import { Stats } from "../../../../combat/CombatSim/Effects/StatModifier";

const USES = [1, 1, 2];
const STRENGTH = [25, 50, 50];
const CHARGE_TIME = 4;

export class CriticalStrike extends NeutralSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], NeutralSkill.CRITICAL_STRIKE_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        const critBoost: number = STRENGTH[this.level];
        user.info.effects.push(new BasicEffect("~CRITICAL_STRIKE", EffectDuration.ATTACKS, 1, 0,
            [{ stat: Stats.CRIT_RATE, amount: critBoost }]));
        return user.performBasicAttack(enemy);
    }

}