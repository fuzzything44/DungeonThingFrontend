import * as React from 'react';
import { Link } from 'react-router-dom';
import { LOCATIONS } from '../locations';

interface BackArrowProps {
};


export const BackArrow: React.FC<BackArrowProps> = (props) => {
    return <Link
        to={LOCATIONS.TAVERN}
        style={{
            position: "absolute",
            left: "2em",
            top: "calc(90vh - 10em)",
            height: "10em"
        }}
    >
        <img
            style={{ height: "100%" }}
            src={require("../../images/guild/back.png")}
            alt="Back to Tavern Hub"
            title="Back to Tavern Hub"
        />
    </Link>;
}