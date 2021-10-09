import * as React from 'react';
import { DungeonEntrance } from '../DungeonEntrance';
import { DUNGEONS } from '../../combat/locationInfo';

interface TavernDoorProps {
    dungeonId: number;
    tickets: number
}

const TavernDoor: React.FC<TavernDoorProps> = (props) => {
    return <div
        style={{
            position: "absolute",
            left: "31em",
            top: "calc(36.3vh - 10em)",
            height: "10em"
        }}
    >
        <DungeonEntrance
            playerDungeon={props.dungeonId}
            tickets={props.tickets}
            thisDungeon={DUNGEONS.TAVERN_CELLAR}
        >
            <img
                style={{ height: "100%" }}
                src={require("../../images/tavern/door.png")}
                alt="To Cellar"
                title="To Cellar"
            />
        </DungeonEntrance>
    </div>
}

TavernDoor.displayName = "TavernDoor";

export { TavernDoor }