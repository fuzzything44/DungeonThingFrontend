import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { BasicEffect, EffectDuration } from "../../../../combat/CombatSim/Effects/BasicEffect";
import { FireSkill } from "./FireSkill";

const USES = [1, 1, 2, 3];
const STRENGTH = [0.075, 0.10, 0.10, 0.10];
const DURATION = [30, 30, 30, 40];
const CHARGE_TIME = 4;

export class Burn extends FireSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], FireSkill.BURN_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        const duration = DURATION[this.level];
        const damageMult = STRENGTH[this.level];
        const dps = user.totalDamage * damageMult;
        enemy.info.effects.push(new BasicEffect("Burnt", EffectDuration.TIME, duration, dps, []));

        return this.uselessAction(user);
    }

}