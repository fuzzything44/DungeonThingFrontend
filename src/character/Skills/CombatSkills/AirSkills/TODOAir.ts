import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { AirSkill } from "./AirSkill";

const USES = [0];

const CHARGE_TIME = 999;

export class TODOAir extends AirSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], AirSkill.TODO_AIR_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        // Hopefully this does something neat.
        return this.uselessAction(user);
    }

}