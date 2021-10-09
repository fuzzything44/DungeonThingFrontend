import * as React from 'react';
import { buttonStyle } from '../../styles';
import { ItemDisplay } from '../../inventory/ItemDisplay';
import { ItemInfo, PlayerInfo } from '../../api/ApiObjects';

interface DistributionProps {
    item: ItemInfo;
    self: PlayerInfo;
    members: PlayerInfo[];
}

export const ItemDistribution: React.FC<DistributionProps> = (props) => {
    const [distributeAmt, changeAmt] = React.useState(0);
    const [player, changePlayer] = React.useState<number>(-1); // index in players

    if (props.self.position === "MEMBER") {
        return <ItemDisplay {...props.item} />;
    }

    return <div style={{ display: "inline-block", paddingRight: "1em" }}>
        <div style={{ float: "left" }}><ItemDisplay {...props.item} /></div>
        <div style={{ float: "left" }}>
            <input
                type="number"
                onChange={(e) => changeAmt(parseInt(e.target.value))}
                value={distributeAmt}
                style={{ display: "block", marginTop: "0.6em", marginBottom: "0.2em" }}
            />
            <select
                onChange={(e) => changePlayer(parseInt(e.target.value))}
                value={player}
            >
                <option value={-1}>Choose a Member</option>
                {props.members.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
            </select>
            <br/>
            <button
                style={{ ...buttonStyle, marginTop: "0.2em", backgroundColor: player === -1 ? "gray" : buttonStyle.backgroundColor }}
                onClick={() => alert(distributeAmt + "," + player)}
                disabled={player === -1}
            >
                Distribute
            </button>
        </div>
    </div>;
}