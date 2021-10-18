import * as React from 'react';
import { buttonStyle } from '../../styles';
import { ItemDisplay } from '../../inventory/ItemDisplay';
import { ItemInfo, callAddToGuildStorage } from '../../api/ApiObjects';
import { store } from '../../redux/store';
import { changeItemAmount } from '../../redux/inventory/actions';
import { setGuildItemAmount } from '../../redux/guild/actions';

interface DonateProps {
    item: ItemInfo;
    changeError: (error: string) => void;
}

export const ItemDonation: React.FC<DonateProps> = (props) => {
    const [donated, changeDonated] = React.useState(0);

    return <div style={{ display: "inline-block", paddingRight: "1em" }}>
        <div style={{ float: "left" }}><ItemDisplay {...props.item} /></div>
        <div style={{ float: "left" }}>
            <input
                type="number"
                onChange={(e) => changeDonated(parseInt(e.target.value))}
                value={donated}
                style={{ display: "block", marginTop: "0.6em", marginBottom: "0.2em" }}
            />
            <button
                style={buttonStyle}
                onClick={() => {
                    callAddToGuildStorage({
                        item_id: props.item.itemId,
                        item_data: props.item.itemData,
                        item_amount: donated
                    }).then(() => {
                        store.dispatch(changeItemAmount(props.item, props.item.amount - donated));
                        const heldInGuild = store.getState().guild.items.find(item => item.itemId === props.item.itemId && item.itemData === props.item.itemData);
                        store.dispatch(setGuildItemAmount(props.item, (heldInGuild ? heldInGuild.amount : 0) + donated));
                    }).catch(e => props.changeError(e.message));
                }}
            >
                Donate
            </button>
        </div>
    </div>;
}