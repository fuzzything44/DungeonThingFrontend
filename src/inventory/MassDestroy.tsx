import * as React from "react";
import { EquipInfo, callDestroy, callGetInventory } from "../api/ApiObjects";
import { buttonStyle } from "../styles";
import { ErrorBox } from "../Util/ErrorBox";
import { store } from "../redux/store";
import { setInventory } from "../redux/inventory/actions";

interface MassDestroyProps {
    equips: EquipInfo[];
    typeFilter: number
}

const MassDestroy: React.FC<MassDestroyProps> = (props) => {
    const [rank, changeRank] = React.useState("none");
    const [error, changeError] = React.useState("");

    const allRanks = props.equips
        .filter(equip => equip.type === props.typeFilter || props.typeFilter === -1)
        .map(equip => ({ rank: equip.rankId, name: equip.rank }));

    const validRanks = allRanks.filter((rank, index) => index === allRanks.findIndex(rank2 => rank2.rank === rank.rank));

    if (rank !== "none" && validRanks.find(elem => elem.rank.toString() === rank) === undefined) {
        changeRank("none");
    }

    return <div style={{
        padding: "0.2em"
    }}>
        {error ? <ErrorBox message={error} /> : null}
        Destroy All Equips Of Rank: {" "}
        <select
            onChange={(e) => {
                changeRank(e.target.value);
                changeError("");
            }}
            value={rank}
        >
            <option value="none">Choose a Rank</option>
            {validRanks.map(rank => <option
                key={rank.rank}
                value={rank.rank.toString()}
            >
                {rank.name} (Rank {rank.rank})
            </option>)}
        </select>
        {rank === "none" ? null : <button
            style={{
                ...buttonStyle,
                marginLeft: "0.2em"
            }}
            onClick={async () => {
                try {
                    props.equips.forEach(equip => {
                        if (equip.rankId.toString() === rank &&
                            (equip.type === props.typeFilter || props.typeFilter === -1)) {
                            callDestroy({ id: equip.id });
                        }
                    });
                    const inventory = await callGetInventory({});
                    store.dispatch(setInventory(inventory));
                } catch (e) {
                    changeError(e.message);
                }
            }}
        >
            Destroy
        </button>}
    </div>;
}

MassDestroy.displayName = "MassDestroy";

export { MassDestroy }