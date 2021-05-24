import { NeutralSkill } from "./NeutralSkill";
import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";

export class NoOpSkill extends NeutralSkill {    
    public constructor() {
        super(0, 0);
    }

    public get chargeTime(): number {
        return 0;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        return user.performBasicAttack(enemy);
    }

}