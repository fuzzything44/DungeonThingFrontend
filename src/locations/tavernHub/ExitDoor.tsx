import * as React from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../redux/store';
import { LOCATIONS } from '../locations';

interface ExitDoorProps {

}

export const ARMORY_UNLOCK_FLOOR = 25;

const ExitDoor: React.FC<ExitDoorProps> = (props) => {
    if (store.getState().player.max_floor < ARMORY_UNLOCK_FLOOR) {
        return null;
    }
    return <Link
        to={LOCATIONS.TOWN}
        style={{
            position: "absolute",
            left: "40em",
            bottom: "0",
            height: "10em"
        }}
    >
        <img
            style={{ height: "100%" }}
            src={require("../../images/tavern/door.png")}
            alt="To town"
            title="To town"
        />
    </Link>
}

ExitDoor.displayName = "ExitDoor";

export { ExitDoor }