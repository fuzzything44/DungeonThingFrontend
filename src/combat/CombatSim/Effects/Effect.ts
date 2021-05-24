import { StatModifier } from "./StatModifier"
import { CombatActor } from "../CombatActor"

export abstract class Effect {
    public abstract get expired(): boolean;
    public abstract get modifiers(): StatModifier[];

    public abstract tickEffect(time: number, self: CombatActor): void;
    public abstract tickEffectAction(self: CombatActor): void;
}