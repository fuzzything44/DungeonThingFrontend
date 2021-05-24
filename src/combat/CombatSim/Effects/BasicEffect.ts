import { Effect } from "./Effect";
import { StatModifier } from "./StatModifier";
import { CombatActor } from "../CombatActor";

export enum EffectDuration {
    TIME,
    ATTACKS
}
export class BasicEffect extends Effect {
    private readonly durationType: EffectDuration;
    private duration: number;

    private readonly _modifiers: StatModifier[];

    constructor(type: EffectDuration, duration: number, modifiers: StatModifier[]) {
        super();
        this.durationType = type;
        this.duration = duration;
        this._modifiers = modifiers;
    }

    public get expired(): boolean {
        return this.duration <= 0;
    }

    public get modifiers(): StatModifier[] {
        return this._modifiers;
    }

    public tickEffect(time: number, self: CombatActor): void {
        if (this.durationType === EffectDuration.TIME) {
            this.duration -= time;
        }
    }

    public tickEffectAction(self: CombatActor): void {
        if (this.durationType === EffectDuration.ATTACKS) {
            this.duration--;
        }
    }
}