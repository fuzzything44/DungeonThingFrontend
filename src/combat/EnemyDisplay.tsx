import * as React from 'react';
import { CombatState, CombatActorAction, HP, Damage } from '../redux/combat/types';
import { HealthBar } from './HealthBar';
import { FloatingDamage } from './FloatingDamage';
import { FakeGif } from '../Util/FakeGif';
import { EnemyImages } from '../images/animations';

interface EnemyDisplayProps {
    type: CombatState["enemyType"];
    hp: HP;
    damage: Damage[];
    action: CombatActorAction;
    images: EnemyImages;
};

export const ENTER_TIME = 3;
export const DEATH_TIME = 3;

const EnemyDisplay: React.FC<EnemyDisplayProps> = (props) => {
    const images: string[] = (() => {
        switch (props.type) {
            case "BOSS":
                switch (props.action.type) {
                    case "ENTERING":
                        return props.images.boss.entering;
                    case "DYING":
                        return props.images.boss.dying;
                    default:
                        return props.images.boss.attacking;
                }
            case "REGULAR":
                switch (props.action.type) {
                    case "DYING":
                        return props.images.regular.dying;
                    default:
                        return [props.images.regular.base];
                }
            case "NONE":
                return [""];
            default:
                return ((_ : never) => [])(props.type)
        }
    })();
    return <div style={{
        width: "calc(15% + 10em)",
        position: "absolute",
        bottom: "25%",
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
                <div style={{height: "1em"}} />
                <FakeGif
                    alt="Enemy"
                    style={{ width: "100%" }}
                    images={images}
                    playTime={props.action.time}
                    startTime={props.action.startTime}
                />
            </div>
        </div>
    </div>;
}

EnemyDisplay.displayName = "EnemyDisplay";

export { EnemyDisplay };
