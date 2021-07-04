import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { EarthSkill } from "./EarthSkill";

const USES = [2, 2, 3, 4];
const CHARGE_TIME = 4;

export class RockWall extends EarthSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], EarthSkill.ROCK_WALL_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        // Extra def is useless when enemies don't attack.
        return this.uselessAction(user);
    }

}