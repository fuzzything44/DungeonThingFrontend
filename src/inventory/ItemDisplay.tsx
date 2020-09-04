import * as React from 'react';
import { ItemDetails } from './ItemDetails';
import { getItemInformation } from './itemInfo';
import { outlineText } from '../styles';

interface ItemDisplayProps {
    itemId: number;
    itemData: number;
    amount: number;
    disableDetails?: boolean;
}

function getImageLoc(itemId: number, itemData: number): string {
    let folder = getItemInformation(itemId, itemData).imageFolder;
    if (folder.img.length < itemData) {
        return folder.base;
    }
    return folder.img[itemData - 1];
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
    const style: React.HTMLAttributes<HTMLDivElement>["style"] = {
        width: "3em",
        height: "3em",
        position: "relative",
        margin: "0.5em",
        display: "inline-block"
    };
    const content = <>
        <img
            src={getImageLoc(props.itemId, props.itemData)}
            style={{
                border: "2px solid",
                height: "100%",
                width: "100%",
                borderRadius: "0.5em",
                borderColor: getBorderColor(props.itemId, props.itemData)
            }}
            title={getItemInformation(props.itemId, props.itemData).name}
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
    </>;
    if (props.disableDetails) {
        return <div style={style}>
            {content}
        </div>
    } else {
        return <button style={style} onClick={() => changeShowDetails(true)}>
            {content}
        </button>
    } 
}
ItemDisplay.displayName = "ItemDisplay";

export { ItemDisplay };