import * as React from 'react';
import { CombatActorAction, HP, Damage } from '../redux/combat/types';
import { HealthBar } from './HealthBar';
import { FloatingDamage } from './FloatingDamage';
import { PlayerGif, PlayerActions } from '../Util/PlayerGif';

interface PlayerDisplayProps {
    walking: boolean;
    hp: HP;
    damage: Damage[];
    action: CombatActorAction;
};

const PlayerDisplay: React.FC<PlayerDisplayProps> = (props) => {
    let action: PlayerActions;
    if (props.walking) {
        action = PlayerActions.WALKING;
    } else if (props.action.type === "ATTACK" || props.action.type === "CRITICAL") {
        action = PlayerActions.ATTACKING;
    } else {
        action = PlayerActions.IDLE;
    }
    return <div style={{
        width: "10em",
        position: "absolute",
        bottom: "25%",
        left: "min(10em, 15%)",
    }}>
        {props.damage.map(dmg => <FloatingDamage key={dmg.startTime} damage={dmg} />)}
        {props.walking ? null : <HealthBar hp={props.hp} />}
        <PlayerGif
            action={action}
            time={props.action.time}
            startTime={props.action.startTime}
            title=""
        />
    </div>;
}

PlayerDisplay.displayName = "PlayerDisplay";

export { PlayerDisplay };
