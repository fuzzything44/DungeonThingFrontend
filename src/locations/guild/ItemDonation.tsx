import * as React from 'react';
import { buttonStyle } from '../../styles';
import { ItemDisplay } from '../../inventory/ItemDisplay';
import { ItemInfo } from '../../api/ApiObjects';

interface DonateProps {
    item: ItemInfo;
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
                onClick={() => alert(donated)}
            >
                Donate
            </button>
        </div>
        
    </div>;
}