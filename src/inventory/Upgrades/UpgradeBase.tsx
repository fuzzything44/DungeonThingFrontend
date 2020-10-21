import * as React from "react";
import { BoxedImage } from "../../Util/BoxedImage";
import { EquipInfo } from "../../api/ApiObjects";
import { standardBorderColors, getEquipImage } from "../itemInfo";
import { border, buttonStyle } from "../../styles";

interface UpgradeBaseProps {
    name: string;
    equip: EquipInfo;
    imageElements: React.ReactNode;
    helpText: React.ReactNode;
}

const UpgradeBase: React.FC<UpgradeBaseProps> = (props) => {
    const [showHelp, toggleHelp] = React.useReducer(val => !val, false);

    return <div style={{ textAlign: "center" }}>
        <h1>{props.name} <button
            style={{
                ...border,
                borderRadius: "50%",
                height: "1em",
                width: "1em",
                margin: "0.1em",
                lineHeight: "75%"
            }}
            onClick={toggleHelp}
        >?</button>
        </h1><br />
        <div style={{ height: "1em" }} />
        {props.equip.name}<br />
        <BoxedImage
            image={getEquipImage(props.equip.type, props.equip.rankId)}
            borderColor={standardBorderColors(props.equip.rankId)}
            title={props.equip.name}
            style={{ margin: "0.5em" }}
        >
            {props.imageElements}
        </BoxedImage><br />
        {showHelp ? <>
            {props.helpText}<br />
            <button style={buttonStyle} onClick={toggleHelp}>Done</button>
        </> : props.children}
        <div style={{ height: "1em" }} />
    </div>;
}

UpgradeBase.displayName = "UpgradeBase";

export { UpgradeBase } 