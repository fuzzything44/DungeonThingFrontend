import { BossLog } from "../../../api/ApiObjects";
import { CombatActor } from "../../../combat/CombatSim/CombatActor";

export abstract class CombatSkill {
    public static readonly NEUTRAL_SKILL_START = 0;

    public uses: number;
    public readonly id: number;
    public abstract get chargeTime(): number;

    constructor(uses: number, id: number) {
        this.uses = uses;
        this.id = id;
    }

    public abstract useSkill(user: CombatActor, enemy: CombatActor): BossLog;
}