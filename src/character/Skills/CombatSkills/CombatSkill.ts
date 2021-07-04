import { BossLog } from "../../../api/ApiObjects";
import { CombatActor } from "../../../combat/CombatSim/CombatActor";

export abstract class CombatSkill {
    public static readonly NEUTRAL_SKILL_START = 0;
    public static readonly FIRE_SKILL_START  = 1000;
    public static readonly WATER_SKILL_START = 2000;
    public static readonly EARTH_SKILL_START = 3000;
    public static readonly AIR_SKILL_START   = 4000;

    public uses: number;
    public readonly id: number;
    public abstract get chargeTime(): number;

    constructor(uses: number, id: number) {
        this.uses = uses;
        this.id = id;
    }

    public abstract useSkill(user: CombatActor, enemy: CombatActor): BossLog;

    protected uselessAction(user: CombatActor): BossLog {
        const timeSpent = user.info.toNextAttack;
        user.info.toNextAttack += user.totalAttackSpeed;
        return {
            time: timeSpent,
            damageDealt: 0,
            toPlayer: true,
            remainingHp: 0,
            bossHp: 0,
            details: {},
            playerCharge: 0
        };
    }
}