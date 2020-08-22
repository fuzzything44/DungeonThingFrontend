import * as React from 'react';
import { CombatState, CombatActorAction, HP, Damage } from '../redux/combat/types';
import { HealthBar } from './HealthBar';
import { FloatingDamage } from './FloatingDamage';

interface EnemyDisplayProps {
    type: CombatState["enemyType"];
    hp: HP;
    damage: Damage[];
    action: CombatActorAction;
};

export const ENTER_TIME = 3;
export const DEATH_TIME = 3;

const EnemyDisplay: React.FC<EnemyDisplayProps> = (props) => {
    return <div style={{
        overflowX: "hidden",
        overflowY: "visible",
        position: "absolute",
        width: "calc(10em + min(10em, 15vw))",
        height: "85%",
        right: "0",
        top: "0"
    }}>
        <div style={{
            position: "absolute",
            bottom: "0",
            width: "10em",
            animation: props.action.type === "ENTERING" ? `slide ${ENTER_TIME}s linear` : ""
        }}>
            {props.damage.map(dmg => <FloatingDamage damage={dmg} />)}
            {props.action.type === "ENTERING" ? null : <HealthBar hp={props.hp} />}
            <img alt="Enemy" style={{ width: "100%" }} src={require("../images/mana.png")} />
        </div>
    </div>;
}

EnemyDisplay.displayName = "EnemyDisplay";

export { EnemyDisplay };
