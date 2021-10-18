import * as React from 'react';
import { buttonStyle } from '../../styles';
import { formatNumber } from '../../Util/numberFormat';
import { callAddToGuildStorage } from '../../api/ApiObjects';
import { store } from '../../redux/store';
import { setGuildInfo } from '../../redux/guild/actions';
import { setPlayerInfo } from '../../redux/player/actions';

interface DonateProps {
    amountHeld: number;
    resource: React.ReactNode;
    name: "mana" | "gold";
    changeError: (error: string) => void;
}

export const ResourceDonation: React.FC<DonateProps> = (props) => {
    const [donated, changeDonated] = React.useState(0);

    return <div>
        {formatNumber(props.amountHeld)} {props.resource}<br />
        <button
            style={buttonStyle}
            onClick={() => {
                callAddToGuildStorage({ [props.name]: donated }).then(() => {
                    store.dispatch(setGuildInfo({
                        [props.name]: store.getState().guild[props.name] + donated
                    }));
                    store.dispatch(setPlayerInfo({
                        [props.name]: store.getState().player[props.name] - donated
                    }));
                }).catch(e => props.changeError(e.message));
            }}
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