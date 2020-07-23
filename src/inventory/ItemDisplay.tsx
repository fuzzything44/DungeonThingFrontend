import * as React from 'react';
import { ItemDetails } from './ItemDetails';
import { getItemInformation } from './itemInfo';

interface ItemDisplayProps {
    itemId: number;
    itemData: number;
    amount: number;
    disableDetails?: boolean;
}

function getImageLoc(itemId: number, itemData: number): string {
    let folder: string = getItemInformation(itemId, itemData).imageFolder;
    if (folder == "") {
        return "../images/default.png";
    }
    return document.location.href + "/images/" + folder + "/" + itemData.toString() + ".png";
}

function getBorderColor(itemId: number, itemData: number) {
    if ([1, 2].includes(itemId)) {
        return ["gray", "green", "blue", "mediumorchid", "red", "deeppink"][Math.floor((itemData - 1) / 5)];
    }
    return "black";
}
const ItemDisplay: React.SFC<ItemDisplayProps> = (props) => {
    let [showDetails, changeShowDetails] = React.useState(false);

    let detailsDisplay = null;
    if (showDetails) {
        detailsDisplay = <ItemDetails
            itemAmount={props.amount}
            itemData={props.itemData}
            itemId={props.itemId}
            onClose={() => changeShowDetails(false) }
        />;
    }

    return <div
        style={{
            width: "3em",
            height: "3em",
            position: "relative",
            margin: "0.5em",
            display: "inline-block",
            backgroundImage: `url(/images/default.png)`,
            backgroundSize: "cover"
        }}
        onClick={() => {
            console.log("click");
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
                    e.target.src = ""
                } else {
                    e.target.src = source.replace(/[0-9]*\.png/, "base.png");
                }
            }}
        />
        <div
            style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
                fontWeight: "bold"
            }}
        >
            {props.amount === 1 ? null : props.amount}
        </div>
        {detailsDisplay}
    </div>; 
}
ItemDisplay.displayName = "ItemDisplay";

export { ItemDisplay };