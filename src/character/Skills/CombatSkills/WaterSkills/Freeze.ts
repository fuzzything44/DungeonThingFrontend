import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { WaterSkill } from "./WaterSkill";

const USES = [1, 1, 2, 2];
const CHARGE_TIME = 4;

export class Freeze extends WaterSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], WaterSkill.CHILL_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        // Freezing does nothing to inanimate objects
        return this.uselessAction(user);
    }

}