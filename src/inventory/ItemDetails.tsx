import * as React from 'react';
import { Modal } from '../Util/Modal';
import { getItemInformation } from './itemInfo';
import { ItemDisplay } from './ItemDisplay';
import { buttonStyle } from '../styles';
import { callUseItem } from '../api/ApiObjects';

interface ItemDetailsProps {
    itemId: number,
    itemData: number,
    itemAmount: number,
    onClose: () => void
}

const ItemDetails: React.FC<ItemDetailsProps> = (props) => {
    const info = getItemInformation(props.itemId, props.itemData)
    const [usingItem, changeUsing] = React.useState(false);
    const [useMessage, changeMessage] = React.useState("");

    return <Modal onClose={props.onClose} title={getItemInformation(props.itemId, props.itemData).name}>
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "3em" }}>
            <ItemDisplay itemId={props.itemId} itemData={props.itemData} amount={1} disableDetails={true} />
        </div>
        <div style={{ textAlign: "center" }}>
            {info.description.split("\n").map((desc, index) => <div key={index}>{desc}</div>)}
        </div>
        {info.useOptions != null && !usingItem ?
            <div style={{ textAlign: "center" }}>
                {useMessage}
                {info.useOptions.map(option => <button
                    style={{ ...buttonStyle, marginRight: "0.2em" }}
                    onClick={async () => {
                        changeUsing(true);
                        const result = await callUseItem({ id: props.itemId, data: props.itemData, option: option });
                        changeMessage(result.message);
                        changeUsing(false);
                    }}
                >
                    {option[0].toUpperCase() + option.slice(1, option.length)}
            </button>)}
            </div> : null}
        <br />
        <div>
            You currently have {props.itemAmount}
        </div>
    </Modal>
}

ItemDetails.displayName = "ItemDetails";

export { ItemDetails };