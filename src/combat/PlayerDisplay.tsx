import * as React from 'react';
import { CombatActorAction, HP, Damage } from '../redux/combat/types';
import { HealthBar } from './HealthBar';
import { FloatingDamage } from './FloatingDamage';
import { FakeGif } from '../Util/FakeGif';
import { player_walking, player_attacking, player_standing } from '../images/animations';

interface PlayerDisplayProps {
    walking: boolean;
    hp: HP;
    damage: Damage[];
    action: CombatActorAction;
};

const PlayerDisplay: React.FC<PlayerDisplayProps> = (props) => {
    let playerImages: string[];
    if (props.walking) {
        playerImages = player_walking;
    } else if (props.action.type === "ATTACK") {
        playerImages = player_attacking;
    } else {
        playerImages = player_standing;
    }

    return <div style={{
        width: "10em",
        position: "absolute",
        bottom: "35%",
        left: "min(10em, 15%)",
        height: "20em"
    }}>
        {props.damage.map(dmg => <FloatingDamage key={dmg.startTime} damage={dmg} />)}
        {props.walking ? null : <HealthBar hp={props.hp} />}
        <FakeGif
            style={{
                paddingTop: "1em",
                height: "100%"
            }}
            images={playerImages}
            repeat
            playTime={props.action.time}
            startTime={props.action.startTime}
            alt=""
        />
    </div>;
}

PlayerDisplay.displayName = "PlayerDisplay";

export { PlayerDisplay };
