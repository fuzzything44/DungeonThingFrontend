import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { AirSkill } from "./AirSkill";

const USES = [1, 1, 2, 3];

const CHARGE_TIME = 4;

export class TwistingWinds extends AirSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], AirSkill.TWISTING_WINDS_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        // Dodge chance is useless
        return this.uselessAction(user);
    }

}