import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { BasicEffect, EffectDuration } from "../../../../combat/CombatSim/Effects/BasicEffect";
import { Stats } from "../../../../combat/CombatSim/Effects/StatModifier";
import { FireSkill } from "./FireSkill";

const USES = [2, 4, 6, 6];
const BASE_BOOST = 25;
const STACKING_BOOST = [50, 50, 50, 75];
const CHARGE_TIME = 4;

export class FanTheFlames extends FireSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], FireSkill.FAN_THE_FLAMES_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        const effectName = "Flame Intensity";

        const previousCasts = user.info.effects.find(eff => eff.name === effectName);
        let stacks = 0;
        if (previousCasts != null) {
            stacks = previousCasts.modifiers.reduce((accumulator, modifier) => accumulator + modifier.stat === Stats.EFFECT_STACKS ? modifier.amount : 0, 0);
            user.info.effects = user.info.effects.filter(elem => elem !== previousCasts);
        }
        user.info.effects.push(new BasicEffect(effectName, EffectDuration.INFINITE, 1, 0, [{ stat: Stats.EFFECT_STACKS, amount: stacks + 1}]));

        const damageBoost = BASE_BOOST + stacks * STACKING_BOOST[this.level];

        user.info.effects.push(new BasicEffect("~FAN_THE_FLAMES", EffectDuration.ATTACKS, 1, 0, [{ stat: Stats.DAMAGE_PERCENT, amount: damageBoost }]));
        return user.performBasicAttack(enemy);
    }

}