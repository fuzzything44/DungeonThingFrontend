import { CombatActor } from "../../../../combat/CombatSim/CombatActor";
import { BossLog } from "../../../../api/ApiObjects";
import { FireSkill } from "./FireSkill";

const USES = [0];
const CHARGE_TIME = 999;

export class TODOFire extends FireSkill {
    private level: number;
    
    public constructor(level: number) {
        super(USES[level], FireSkill.INCINERATE_ID);
        this.level = level;
    }

    public get chargeTime(): number {
        return CHARGE_TIME;
    }

    public useSkill(user: CombatActor, enemy: CombatActor): BossLog {
        return this.uselessAction(user);
    }

}