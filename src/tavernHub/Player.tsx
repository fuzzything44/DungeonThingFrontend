import * as React from 'react';
import { PAGES } from '../App';
import { Link } from 'react-router-dom';

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
        <img
            style={{ height: "100%" }}
            src={require("../images/animations/player_attacking/3.png")}
            alt="Player"
            title="Player"
        />
    </Link>
}

Player.displayName = "Player";

export { Player }