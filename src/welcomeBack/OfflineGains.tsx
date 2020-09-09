import * as React from 'react';
import { UpdateInformation, BossReward } from '../api/ApiObjects';
import { border, backgroundSecondary } from '../styles';
import { formatNumber } from '../Util/numberFormat';
import { Icon } from '../Util/Icon';
import { ItemDisplay } from '../inventory/ItemDisplay';

interface OfflineGainsProps {
    results: UpdateInformation;
    closeClicked: () => void;
}

const secondsToHms = (totalSeconds: number): string => {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const formatTimePart = (total: number, actual: number, name: string) => {
        if (total > 0) {
            return `${actual} ${name}${actual === 1 ? "" : "s"}`;
        } else {
            return "";
        }
    }
    return [
        formatTimePart(totalDays, totalDays, "day"),
        formatTimePart(totalHours, totalHours % 24, "hour"),
        formatTimePart(totalMinutes, totalMinutes % 60, "minute"),
        formatTimePart(totalSeconds, Math.floor(totalSeconds % 60), "second")
    ].filter(tp => tp !== "").join(", ");
}

const OfflineGains: React.FC<OfflineGainsProps> = (props) => {
    const dungeonTickets = props.results.tickets ? <li>{formatNumber(props.results.tickets)} <Icon image={require("../images/ticket.png")} name="Dungeon entry ticket" /></li> : null;
    const drops = props.results.rewards.length === 0 ? null : <div>
        From bosses killed while you were gone, you got
        <ul style={{ listStyleType: "none" }}>
            {props.results.rewards.map((reward: BossReward) => {
                const innerReward = reward.reward;
                switch (innerReward.type) {
                    case "MANA":
                        return <li key={innerReward.amount}>{formatNumber(innerReward.amount)} <Icon image={require("../images/mana.png")} name="Mana" /></li>
                    case "ITEM":
                        return <li key={JSON.stringify(innerReward)}><ItemDisplay {...innerReward.info} /></li>;
                    case "EQUIP":
                        // TODO: handle this once we get a better equip component
                        return <li key= { JSON.stringify(innerReward) }>New equip: {innerReward.info.name}</li>;
                    default: // Ensures compiler error if all cases not covered
                        return ((_: never): null => null)(innerReward);
                }
            })}
        </ul>
    </div>;
    return <div>
        You were offline for {secondsToHms(props.results.time).replace(/ $/, "")}. In that time, you gained: <br />
        <ul
            style={{
                listStyleType: "none"
            }}
        >
            <li>{formatNumber(props.results.gain)} <Icon image={require("../images/mana.png")} name="Mana" /></li>
            {dungeonTickets}
        </ul>
        {drops}
        <br />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <button
                style={{
                    ...backgroundSecondary,
                    ...border,
                    borderRadius: "0.3em",
                    paddingLeft: "0.5em",
                    paddingRight: "0.5em"
                }}
                onClick={props.closeClicked}
            >
                Close
            </button>
        </div>
    </div>
};

OfflineGains.displayName = "OfflineGains";

export { OfflineGains };