import * as React from "react";
import { BoxedImage } from "../../Util/BoxedImage";
import { EquipInfo } from "../../api/ApiObjects";
import { standardBorderColors, getEquipImage } from "../itemInfo";

interface UpgradeBaseProps {
    name: string;
    equip: EquipInfo;
    imageElements: React.ReactNode;
}

const UpgradeBase: React.FC<UpgradeBaseProps> = (props) => {
    return <div style={{ textAlign: "center" }}>
        <h1>{props.name}</h1><br />
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
        {props.children}
        <div style={{ height: "1em" }} />
    </div>;
}

UpgradeBase.displayName = "UpgradeBase";

export { UpgradeBase } 