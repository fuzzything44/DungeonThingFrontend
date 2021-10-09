import * as React from 'react';
import { buttonStyle } from '../../styles';
import { formatNumber } from '../../Util/numberFormat';

interface DonateProps {
    amountHeld: number;
    resource: React.ReactNode;
    name: string;
}

export const ResourceDonation: React.FC<DonateProps> = (props) => {
    const [donated, changeDonated] = React.useState(0);

    return <div>
        {formatNumber(props.amountHeld)} {props.resource}<br />
        <button
            style={buttonStyle}
            onClick={() => alert(donated)}
        >
            Donate
        </button>{" "}
        <input
            type="number"
            onChange={(e) => changeDonated(parseInt(e.target.value))}
            value={donated}
        />
    </div>;
}