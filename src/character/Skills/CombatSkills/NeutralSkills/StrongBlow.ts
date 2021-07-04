import { NeutralSkill } from "./NeutralSkill";
import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { BasicEffect, EffectDuration } from "../../../../combat/CombatSim/Effects/BasicEffect";
import { Stats } from "../../../../combat/CombatSim/Effects/StatModifier";

const USES = [1, 2, 2];
const STRENGTH = 50;
const CHARGE_TIME = [5, 5, 4];

export class StrongBlow extends NeutralSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], NeutralSkill.STRONG_BLOW_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME[this.level];
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        user.info.effects.push(new BasicEffect("~STRONG_BLOW", EffectDuration.ATTACKS, 1, 0,
            [{ stat: Stats.DAMAGE_PERCENT, amount: STRENGTH }]));
        return user.performBasicAttack(enemy);
    }

}