import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { BasicEffect, EffectDuration } from "../../../../combat/CombatSim/Effects/BasicEffect";
import { Stats } from "../../../../combat/CombatSim/Effects/StatModifier";
import { AirSkill } from "./AirSkill";

const USES = [1, 1, 2, 3];
const STRENGTH = [5, 7, 7, 10];

const CHARGE_TIME = 4;

export class GaleWinds extends AirSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], AirSkill.GALE_WINDS_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        const strength: number = STRENGTH[this.level];

        user.info.effects.push(new BasicEffect("Gale Winds", EffectDuration.INFINITE, 1, 0,
            [{ stat: Stats.CRIT_RATE, amount: strength }]));
        // No other useful actions performed.
        return this.uselessAction(user);
    }

}