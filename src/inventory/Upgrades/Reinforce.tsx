import * as React from "react";
import { EquipInfo, callReinforce, ItemInfo, callEquipInfo } from "../../api/ApiObjects";
import { UpgradeBase } from "./UpgradeBase";
import { RootState, store } from "../../redux/store";
import { pause } from "../../Util/pause";
import { buttonStyle } from "../../styles";
import { connect } from "react-redux";
import { ErrorBox } from "../../Util/ErrorBox";
import { ITEM_MAPPINGS } from "../itemInfo";
import { formatNumber } from "../../Util/numberFormat";
import { setEquipInfo, changeItemAmount } from "../../redux/inventory/actions";

interface StateProps {
    items: ItemInfo[]
}

interface PassedProps {
    equip: EquipInfo;
}

type ReinforceProps = StateProps & PassedProps;

const ReinforceUnmapped: React.FC<ReinforceProps> = (props) => {
    const [coupon, changeCoupon] = React.useState<number | undefined>(undefined);
    const [error, changeError] = React.useState("");
    const [animating, changeAnimating] = React.useState(false);
    const [success, changeSuccess] = React.useState<boolean | undefined>(undefined);

    const reinforceCoupons = props.items.filter(item => item.itemId === ITEM_MAPPINGS.REINFORCE_COUPON);
    const usedCoupon = reinforceCoupons.find(item => item.itemData === coupon);
    const couponsLeft = usedCoupon ? usedCoupon.amount : 0;

    const getSuccessChance = (rank: number) => formatNumber(Math.min(100, 100 * rank / (props.equip.reinforce + 1)));

    const reinforceCost = (props.equip.reinforce + 1) * 10;
    return <UpgradeBase
        name="Reinforce"
        equip={props.equip}
        imageElements={animating ? <>
            {/* TODO: create unique animation for reinforce */}
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
                        border: "1px solid red",
                        animation: "level-up 0.5s infinite",
                        // Random delays so there's not a spiral pattern
                        animationDelay: `-${[0, 6, 3, 7, 4, 2, 1, 5][index] / 10}s`
                    }} />
                </div>
            })}
        </> : null}
        helpText={<>
            Reinforcing consumes reinforce coupons and small amounts of mana to increase equipment stats.<br />
            Each reinforce level provides a 2% (additive) bonus to attack or hp.<br />
            The success chance lowers with each successful reinforce and is increased by using better coupons<br />
            An equipment can be reinforced up to its level.
        </>}
    >
        {success !== undefined ? <div>Upgrade {success ? "Successful!" : "unsuccessful."}</div> : null}
        Reinforces: {props.equip.reinforce}/{props.equip.level}<br />
        {coupon === undefined ? <div>
            {reinforceCoupons.length === 0 ? <div>
                    Destroy reinforced equipment <br />
                    or<br />
                    Adventure in the armory for coupons
                </div> : <div>Select which reinforce coupon to use</div>}
            {reinforceCoupons.map(coupon => <button
                key={coupon.itemData}
                style={{
                    ...buttonStyle,
                    margin: "1em",
                    boxSizing: "border-box"
                }}
                onClick={() => changeCoupon(coupon.itemData)}
            >
                + {coupon.itemData} Coupon<br />
                You have {coupon.amount} of these<br />
                {getSuccessChance(coupon.itemData)}% Success Chance
            </button>)}
        </div> : <>
                You are using +{coupon} Coupons <button
                    style={buttonStyle}
                    onClick={() => changeCoupon(undefined)}
                >Change Coupon</button><br />
                You have {couponsLeft} remaining<br />
                Reinforcing with these gives a {getSuccessChance(coupon)}% success chance<br/>
                <button
                    disabled={usedCoupon === undefined}
                    style={buttonStyle}
                    onClick={async () => {
                        if (usedCoupon === undefined) {
                            return;
                        }
                        changeAnimating(true);
                        try {
                            changeSuccess(undefined);
                            // Animate for 2s or until API call returns
                            const [ reinforce, info] = await Promise.all([
                                callReinforce({ id: props.equip.id, coupon: coupon }),
                                callEquipInfo({ id: props.equip.id}),
                                pause(2)]);
                            store.dispatch(setEquipInfo(info.info));
                            store.dispatch(changeItemAmount(usedCoupon, usedCoupon.amount - 1));
                            changeSuccess(reinforce.success);
                        } catch (error) {
                            changeError(error.message);
                        }
                        changeAnimating(false);
                    }}
                >
                    Reinforce ({formatNumber(reinforceCost)} mana)
        </button></>}
        {error ? <ErrorBox message={error} /> : null}
    </UpgradeBase>
}

ReinforceUnmapped.displayName = "Reinforce";

const mapStateToProps = (state: RootState): StateProps => {
    return {
        items: state.inventory.items
    }
}
const Reinforce = connect(mapStateToProps)(ReinforceUnmapped);

export { Reinforce } 