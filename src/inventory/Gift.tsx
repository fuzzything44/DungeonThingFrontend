import * as React from 'react';
import { GiftInfo, callClaimGift } from '../api/ApiObjects';
import { ItemDisplay } from './ItemDisplay';
import { buttonStyle } from '../styles';
import { ErrorBox } from '../Util/ErrorBox';
import { store } from '../redux/store';
import { removeGift, changeItemAmount } from '../redux/inventory/actions';

type GiftProps = GiftInfo;

export const Gift: React.FC<GiftProps> = (props) => {
    const [claiming, changeClaiming] = React.useState(false);
    const [error, changeError] = React.useState("");

    return <div style={{ minWidth: "25em", display: "flex" }}>
        {error ? <ErrorBox message={error} /> : null}
        <ItemDisplay
            itemId={props.itemId}
            itemData={props.itemData}
            amount={props.amount}
        />
        <div>
            {props.message}<br/>
            <button
                style={{
                    ...buttonStyle,
                    backgroundColor: claiming ? "gray" : buttonStyle.backgroundColor
                }}
                disabled={claiming}
                onClick={() => {
                    changeClaiming(true);
                    changeError("");
                    callClaimGift({ id: props.id }).then(() => {
                        store.dispatch(removeGift(props.id));
                        // Avoid expensive inventory call, so just set items directly
                        const items = store.getState().inventory.items;
                        const thisItem = items.find(i => i.itemId === props.itemId && i.itemData === props.itemData);
                        if (thisItem != null) {
                            store.dispatch(changeItemAmount(thisItem, thisItem.amount + props.amount));
                        } else {
                            store.dispatch(changeItemAmount({
                                itemId: props.itemId,
                                itemData: props.itemData,
                                amount: 0,
                                characterId: props.characterId
                            }, props.amount));
                        }
                    }).catch((e) => {
                        changeClaiming(false);
                        changeError(e.message);
                    });
                }}
            >Claim gift!</button>
        </div>
    </div>;
};