import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { WaterSkill } from "./WaterSkill";

const USES = [1, 1, 2, 3];
const CHARGE_TIME = 3;

export class Rejuvenation extends WaterSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], WaterSkill.CHILL_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        return this.uselessAction(user);
    }

}