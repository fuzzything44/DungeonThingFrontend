import * as React from 'react';
import { Modal } from '../Util/Modal';
import { getItemInformation } from './itemInfo';
import { ItemDisplay } from './ItemDisplay';

interface ItemDetailsProps {
    itemId: number,
    itemData: number,
    itemAmount: number,
    onClose: () => void
}

const ItemDetails: React.FC<ItemDetailsProps> = (props) => {
    return <Modal onClose={props.onClose} title={getItemInformation(props.itemId, props.itemData).name}>
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "3em" }}>
            <ItemDisplay itemId={props.itemId} itemData={props.itemData} amount={1} disableDetails={true} />
        </div>
        <div style={{ textAlign: "center" }}>
            {getItemInformation(props.itemId, props.itemData).description}
        </div><br/>
        <div>
            You currently have {props.itemAmount}
        </div>
    </Modal>
}

ItemDetails.displayName = "ItemDetails";

export { ItemDetails };