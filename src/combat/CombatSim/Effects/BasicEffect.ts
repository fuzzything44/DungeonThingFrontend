import { Effect } from "./Effect";
import { StatModifier } from "./StatModifier";
import { CombatActor } from "../CombatActor";

export enum EffectDuration {
    TIME,
    ATTACKS,
    INFINITE
}
export class BasicEffect extends Effect {
    private readonly durationType: EffectDuration;
    private duration: number;
    private dps: number;

    private readonly _modifiers: StatModifier[];
    private readonly _name: string;

    constructor(name: string, type: EffectDuration, duration: number, damagePerSec: number, modifiers: StatModifier[]) {
        super();
        this._name = name;
        this.durationType = type;
        this.duration = duration;
        this.dps = damagePerSec;
        this._modifiers = modifiers;
    }

    public get name(): string {
        return this._name;
    }

    public get expired(): boolean {
        return this.duration <= 0;
    }

    public get modifiers(): StatModifier[] {
        return this._modifiers;
    }

    public tickEffect(time: number, self: CombatActor): void {
        let realTime = time;
        if (this.durationType === EffectDuration.TIME) {
            realTime = Math.min(this.duration, time);
            this.duration -= realTime;
        }
        self.info.hp -= this.dps * realTime;
    }

    public tickEffectAction(self: CombatActor): void {
        if (this.durationType === EffectDuration.ATTACKS) {
            this.duration--;
        }
    }
}