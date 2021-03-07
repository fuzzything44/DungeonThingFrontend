import * as React from 'react';
import { Link } from 'react-router-dom';
import { LOCATIONS } from '../locations';

interface TavernBuildingProps {
}

const TavernBuilding: React.FC<TavernBuildingProps> = (props) => {
    return <Link
        to={LOCATIONS.TAVERN}
        style={{
            position: "absolute",
            left: "4em",
            bottom: "20vh"
        }}
    >
        <img
            style={{ width: "8em" }}
            src={require("../../images/tavern.png")}
            alt="The tavern"
            title="The tavern"
        />
        <img
            style={{ width: "8em", transform: "scaleX(-1)" }}
            src={require("../../images/tavern.png")}
            alt="The tavern"
            title="The tavern"
        />
    </Link>
}

TavernBuilding.displayName = "TavernBuilding";

export { TavernBuilding }