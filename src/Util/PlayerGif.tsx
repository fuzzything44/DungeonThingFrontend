import * as React from 'react';
import { FakeGif } from './FakeGif';
import { player_walking, player_standing, player_attacking } from '../images/animations';

export enum PlayerActions {
    IDLE,
    WALKING,
    ATTACKING
}
interface PlayerGifProps {
    time: number;
    startTime: number;
    action: PlayerActions;
    title: string;
    height?: number;
}

const PlayerGif: React.FC<PlayerGifProps> = (props) => {
    let playerImages: string[];
    switch (props.action) {
        case PlayerActions.IDLE:
            playerImages = player_standing;
            break;
        case PlayerActions.WALKING:
            playerImages = player_walking;
            break;
        case PlayerActions.ATTACKING:
            playerImages = player_attacking;
            break;
        default:
            return ((_: never) => null)(props.action);
    }

    return <div
        style={{
            height: props.height ? props.height + "em" : "20em",
            width: props.height ? props.height / 2 + "em" : "10em",
            position: "relative"
        }}
    >
        <FakeGif
            style={{
                position: "absolute",
                bottom: "0",
                paddingTop: "1em",
                height: "100%"
            }}
            images={playerImages}
            repeat
            playTime={props.time}
            startTime={props.startTime}
            title={props.title}
            alt={props.title}
        />
    </div>;
};

PlayerGif.displayName = "PlayerGif";

export { PlayerGif }