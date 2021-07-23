import React from "react"
import { Link } from "react-router-dom";
import { LOCATIONS } from "../locations";

export const ForgeBuilding: React.FC<{}> = () => {
    return <Link
        to={LOCATIONS.FORGE}
        style={{
            position: "absolute",
            left: "45em",
            bottom: "20vh"
        }}
    >
        <img
            style={{ width: "20em" }}
            src={require("../../images/forge.png")}
            alt="The forge"
            title="The forge"
        />
    </Link>;
}