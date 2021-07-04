import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { BasicEffect, EffectDuration } from "../../../../combat/CombatSim/Effects/BasicEffect";
import { Stats } from "../../../../combat/CombatSim/Effects/StatModifier";
import { AirSkill } from "./AirSkill";

const USES = [1, 2, 2];
const STRENGTH = [5, 10, 10];
const DURATION = [10, 15, 15];

const CHARGE_TIME = 4;

export class ForcefulGust extends AirSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], AirSkill.FORCEFUL_GUST_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        const strength: number = STRENGTH[this.level];
        const duration: number = DURATION[this.level];

        user.info.effects.push(new BasicEffect("Forceful Gust", EffectDuration.TIME, duration, 0,
            [{ stat: Stats.CRIT_RATE, amount: strength }]));
        // No other useful actions performed.
        return this.uselessAction(user);
    }

}