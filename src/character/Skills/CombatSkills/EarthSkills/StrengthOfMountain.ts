import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { EarthSkill } from "./EarthSkill";

const USES = [1, 1, 2];
const CHARGE_TIME = 4;

export class StrengthOfMountain extends EarthSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], EarthSkill.TODO_EARTH_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        // Who knows what this'll do?
        return this.uselessAction(user);
    }

}