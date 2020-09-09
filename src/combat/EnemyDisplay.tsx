import * as React from 'react';
import { CombatState, CombatActorAction, HP, Damage } from '../redux/combat/types';
import { HealthBar } from './HealthBar';
import { FloatingDamage } from './FloatingDamage';

interface EnemyDisplayProps {
    type: CombatState["enemyType"];
    hp: HP;
    damage: Damage[];
    action: CombatActorAction;
    image: string;
};

export const ENTER_TIME = 3;
export const DEATH_TIME = 3;

const EnemyDisplay: React.FC<EnemyDisplayProps> = (props) => {
    return <div style={{
        width: "calc(15% + 10em)",
        position: "absolute",
        bottom: "30%",
        right: "0"
    }}>
        {props.damage.map(dmg => <FloatingDamage key={dmg.startTime} damage={dmg} />)}
        <div style={{
            width: "100%",
            overflowX: "hidden",
        }}>
            <div
                key={Date.now()}
                style={{
                    overflowX: "hidden",
                    width: "10em",
                    animation: props.action.type === "ENTERING" ? `slide ${ENTER_TIME}s linear` : "",
                    animationDelay: "-" + (Date.now() - props.action.startTime) + "ms"
                }}
            >
                {props.action.type === "ENTERING" ? null : <HealthBar hp={props.hp} />}
                <img alt="Enemy" style={{ width: "100%" }} src={props.image} />
            </div>
        </div>
    </div>;

    return <div style={{
        overflowX: "hidden",
        overflowY: "visible",
        position: "absolute",
        width: "calc(10em + min(10em, 15vw))",
        height: "70%",
        right: "0",
        top: "0"
    }}>
        <div style={{
            position: "absolute",
            bottom: "0"
        }}>
            {props.damage.map(dmg => <FloatingDamage key={dmg.startTime} damage={dmg} />)}
            <div
                key={Date.now()}
                style={{
                    width: "10em",
                    animation: props.action.type === "ENTERING" ? `slide ${ENTER_TIME}s linear` : "",
                    animationDelay: "-" + (Date.now() - props.action.startTime) + "ms"
                }}
            >
                {props.action.type === "ENTERING" ? null : <HealthBar hp={props.hp} />}
                <img alt="Enemy" style={{ width: "100%" }} src={props.image} />
            </div>
        </div>
        
    </div>;
}

EnemyDisplay.displayName = "EnemyDisplay";

export { EnemyDisplay };
