import * as React from 'react';
import { ItemDetails } from './ItemDetails';
import { getItemInformation } from './itemInfo';
import { outlineText } from '../styles';

const DEFAULT_IMAGE: string = require("../images/default.png");

interface ItemDisplayProps {
    itemId: number;
    itemData: number;
    amount: number;
    disableDetails?: boolean;
}

function getImageLoc(itemId: number, itemData: number): string {
    let folder: string = getItemInformation(itemId, itemData).imageFolder;
    if (folder === "") {
        return DEFAULT_IMAGE;
    }
    return document.location.href + "/images/" + folder + "/" + itemData.toString() + ".png";
}

function getBorderColor(itemId: number, itemData: number) {
    if ([1, 2].includes(itemId)) {
        return ["gray", "green", "blue", "mediumorchid", "red", "deeppink"][Math.floor((itemData - 1) / 5)];
    }
    return "black";
}

const ItemDisplay: React.FC<ItemDisplayProps> = (props) => {
    let [showDetails, changeShowDetails] = React.useState(false);

    (window as any).getImageLoc = getImageLoc;
    let detailsDisplay = null;
    if (showDetails) {
        detailsDisplay = <ItemDetails
            itemAmount={props.amount}
            itemData={props.itemData}
            itemId={props.itemId}
            onClose={() => changeShowDetails(false) }
        />;
    }

    return <button
        style={{
            width: "3em",
            height: "3em",
            position: "relative",
            margin: "0.5em",
            display: "inline-block"
        }}
        onClick={() => {
            if (props.disableDetails) {
                return;
            }
            changeShowDetails(true);
        }}
    >
        <img
            src={getImageLoc(props.itemId, props.itemData)}
            style={{
                border: "2px solid",
                height: "100%",
                width: "100%",
                borderRadius: "0.5em",
                borderColor: getBorderColor(props.itemId, props.itemData)
            }}
            onError={(e: any) => {
                let source: string = e.target.src;
                if (source.endsWith("base.png")) {
                    e.target.src = DEFAULT_IMAGE
                }
                else {
                    e.target.src = source.replace(/[0-9]*\.png/, "base.png");
                }
            }}
            alt={getItemInformation(props.itemId, props.itemData).name}
        />
        <div
            style={{
                ...outlineText,
                position: "absolute",
                bottom: "0",
                right: "0",
                fontWeight: "bold"
            }}
        >
            {props.amount === 1 ? null : props.amount}
        </div>
        {detailsDisplay}
    </button>; 
}
ItemDisplay.displayName = "ItemDisplay";

export { ItemDisplay };