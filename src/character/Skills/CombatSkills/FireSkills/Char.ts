import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { BasicEffect, EffectDuration } from "../../../../combat/CombatSim/Effects/BasicEffect";
import { FireSkill } from "./FireSkill";

const USES = [1, 1, 2, 3];
const STRENGTH = [0.025, 0.05, 0.05, 0.05];
const CHARGE_TIME = 4;

export class Char extends FireSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], FireSkill.INCINERATE_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        const damageMult: number = STRENGTH[this.level];
        const dps = user.totalDamage * damageMult;
        enemy.info.effects.push(new BasicEffect("Charred", EffectDuration.INFINITE, 1, dps, []));

        return this.uselessAction(user);
    }

}