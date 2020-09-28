import * as React from 'react';
import { PAGES } from '../App';
import { Link } from 'react-router-dom';
import { PlayerGif, PlayerActions } from '../Util/PlayerGif';
import { DEFAULT_ACTION_TIME } from '../combat/combatRunner';

interface PlayerProps {
}

const Player: React.FC<PlayerProps> = (props) => {
    return <Link
        to={PAGES.CHARACTER}
        style={{
            position: "absolute",
            left: "18em",
            bottom: "33vh",
            height: "14em"
        }}
    >
        <PlayerGif
            action={PlayerActions.IDLE}
            time={DEFAULT_ACTION_TIME}
            startTime={0}
            height={"15em"}
            title="Player"
        />
    </Link>
}

Player.displayName = "Player";

export { Player }