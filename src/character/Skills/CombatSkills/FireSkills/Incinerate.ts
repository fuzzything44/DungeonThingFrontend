import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { BasicEffect, EffectDuration } from "../../../../combat/CombatSim/Effects/BasicEffect";
import { Stats } from "../../../../combat/CombatSim/Effects/StatModifier";
import { FireSkill } from "./FireSkill";

const USES = [1, 2, 2, 2];
const STRENGTH = [200, 200, 300, 300];
const CHARGE_TIME = 4;
const SELF_HARM_RATE = [0.25, 0.25, 0.25, 0.20];

export class Incinerate extends FireSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], FireSkill.INCINERATE_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        const strength: number = STRENGTH[this.level];
        const selfDamageAmt = SELF_HARM_RATE[this.level];

        user.info.effects.push(new BasicEffect("~INCINERATE", EffectDuration.ATTACKS, 1, 0,
            [{ stat: Stats.DAMAGE_PERCENT, amount: strength }]));
        let attack = user.performBasicAttack(enemy);
        user.info.hp -= attack.damageDealt * selfDamageAmt;
        return attack;
    }

}