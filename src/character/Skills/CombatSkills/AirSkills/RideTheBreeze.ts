import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { BasicEffect, EffectDuration } from "../../../../combat/CombatSim/Effects/BasicEffect";
import { Stats } from "../../../../combat/CombatSim/Effects/StatModifier";
import { AirSkill } from "./AirSkill";

const USES = [1, 2, 3, 3];
const STRENGTH = [10, 15, 15, 20];
const DURATION = [20, 30, 30, 45];

const CHARGE_TIME = 3;

export class RideTheBreeze extends AirSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], AirSkill.RIDE_THE_BREEZE_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        const strength: number = STRENGTH[this.level];
        const duration: number = DURATION[this.level];

        user.info.effects.push(new BasicEffect("Breeze Riding", EffectDuration.TIME, duration, 0,
            [{ stat: Stats.ATTACK_SPEED, amount: strength }]));
        // No other useful actions performed.
        return this.uselessAction(user);
    }

}