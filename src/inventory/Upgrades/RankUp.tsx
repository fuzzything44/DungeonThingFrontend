import * as React from "react";
import { EquipInfo, callRankUp, ItemInfo, callEquipInfo } from "../../api/ApiObjects";
import { UpgradeBase } from "./UpgradeBase";
import { pause } from "../../Util/pause";
import { buttonStyle } from "../../styles";
import { standardBorderColors, ITEM_MAPPINGS } from "../itemInfo";
import { ErrorBox } from "../../Util/ErrorBox";
import { RootState, store } from "../../redux/store";
import { connect } from "react-redux";
import { formatNumber } from "../../Util/numberFormat";
import { setEquipInfo, changeItemAmount } from "../../redux/inventory/actions";

interface StateProps {
    items: ItemInfo[];
}

interface PassedProps {
    equip: EquipInfo;
}

type RankUpProps = StateProps & PassedProps;

const RankUpUnmapped: React.FC<RankUpProps> = (props) => {
    const [error, changeError] = React.useState("");
    const [animating, changeAnimating] = React.useState(false);

    const orbItem = props.items.find(item => item.itemId === ITEM_MAPPINGS.RANK_ORB && item.itemData === props.equip.rankId);
    const orbAmount = orbItem ? orbItem.amount : 0;

    return <UpgradeBase
        name="Rank Up"
        equip={props.equip}
        imageElements={animating ? <>
            {/* TODO: create unique animation for rank up */}
            {Array.from(Array(8).keys()).map((index) => {
                return <div
                    style={{
                        transform: `rotate(${45 * index}deg)`,
                        transformOrigin: "top left",
                        position: "absolute",
                        top: "1.5em",
                        left: "1.5em",
                        width: "2em"
                    }}
                    key={index}
                >
                    <div style={{
                        border: "1px solid " + standardBorderColors(props.equip.rankId + 1),
                        animation: "level-up 0.5s infinite",
                        // Random delays so there's not a spiral pattern
                        animationDelay: `-${[0, 6, 3, 7, 4, 2, 1, 5][index] / 10}s`
                    }} />
                </div>
            })}
        </> : null}
        helpText={<>
            Ranking up an equipment slightly improves its attack or hp bonus.<br />
            Additionally, it increases the maximum level by 5<br />
            Ranking up requires using Rank Up orbs, which are gained by destroying equipment of the same rank.
        </>}
    >
        {props.equip.rank}<br />
        You have {orbAmount} +{props.equip.rankId} Rank Orb{orbAmount === 1 ? "" : "s"}<br />
        {orbAmount === 0 ? <>Destroy {props.equip.rank} equipment to get orbs.<br/></> : null}
        <button
            style={{
                ...buttonStyle,
                backgroundColor: orbAmount > 0 ? buttonStyle.backgroundColor : "gray"
            }}
            disabled={orbAmount === 0 || animating}
            onClick={async () => {
                if (orbItem === undefined) {
                    return;
                }
                changeAnimating(true);
                try {
                    // Animate for 2s or until API call returns
                    const rankPromise = callRankUp({ id: props.equip.id });
                    const [info] = await Promise.all([callEquipInfo({ id: props.equip.id }), pause(2)]);
                    await rankPromise;
                    store.dispatch(setEquipInfo(info.info));
                    store.dispatch(changeItemAmount(orbItem, orbItem.amount - 1))
                } catch (error) {
                    changeError(error.message);
                }
                changeAnimating(false);
            }}
        >
            Rank Up ({formatNumber(props.equip.rank_cost)} mana)
        </button>
        {error ? <ErrorBox message={error} /> : null}
    </UpgradeBase>
}

RankUpUnmapped.displayName = "RankUp";

const mapStateToProps = (state: RootState): StateProps => {
    return {
        items: state.inventory.items
    }
}
const RankUp = connect(mapStateToProps)(RankUpUnmapped);

export { RankUp } 