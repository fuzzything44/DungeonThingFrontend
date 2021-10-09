import * as React from 'react';
import { Modal } from '../../Util/Modal';
import { ErrorBox } from '../../Util/ErrorBox';
import { connect } from 'react-redux';
import { RootState, store } from '../../redux/store';
import { ItemInfo, callGetInventory, callCombineItem } from '../../api/ApiObjects';
import { setInventory, changeItemAmount } from '../../redux/inventory/actions';
import { ITEM_MAPPINGS } from '../../inventory/itemInfo';
import { buttonStyle } from '../../styles';
import { formatNumber } from '../../Util/numberFormat';


interface AnvilProps {
    items: ItemInfo[];
}

const AnvilUnmapped: React.FC<AnvilProps> = (props) => {
    const [showUi, changeShowUi] = React.useState(false);
    const [error, changeError] = React.useState("");

    const [orbTier, changeOrbTier] = React.useState(1);
    const [orbAmt, changeOrbAmt] = React.useState(1);
    const orbs = props.items.filter(item => item.itemId === ITEM_MAPPINGS.RANK_ORB);
    const orbMana = Math.pow(orbTier, 2) * 2000;
    const orbsOfTier = orbs.reduce((prev, curr) => curr.itemData === orbTier ? curr.amount : prev, 0);
    if (orbs.length && orbs[0].itemData > orbTier) {
        changeOrbTier(orbs[0].itemData);
    }

    const [couponTier, changeCouponTier] = React.useState(5);
    const [couponAmt, changeCouponAmt] = React.useState(1);
    const coupons = props.items.filter(item => item.itemId === ITEM_MAPPINGS.REINFORCE_COUPON);
    const couponMana = couponTier * 500;
    const couponCost = couponTier * (1 + couponTier / 5);
    const tier1Coupons = coupons.reduce((prev, curr) => curr.itemData === 1 ? curr.amount : prev, 0);
    
    React.useEffect(() => {
        callGetInventory({}).then(data => {
            store.dispatch(setInventory(data));
        }).catch(error => changeError(error.message));
    }, []);

    return <>
        <button
            onClick={() => changeShowUi(true)}
            style={{
                position: "absolute",
                left: "50em",
                bottom: "30vh"
            }}
        >
            <img
                style={{ height: "5em" }}
                src={require("../../images/forge/anvil.png")}
                alt="Anvil"
                title="Anvil"
            />
        </button>
        {showUi ? <Modal title="Item Combination" onClose={() => changeShowUi(false)}>
            {error ? <ErrorBox message={error} /> : null}

            <h2>Rank Orb Combination</h2>
            <div style={{ textAlign: "center"}}>

                Combine Tier <select
                    value={orbTier}
                    onChange={(e) => changeOrbTier(parseInt(e.target.value))}
                >
                    {orbs.map(orb => <option key={orb.itemData} >{orb.itemData}</option>)}
                </select> orbs into tier {orbTier + 1} orbs: 2 orbs and {formatNumber(orbMana)} mana per combine.
                Create <input
                    type="number"
                    value={orbAmt}
                    onChange={(e) => changeOrbAmt(parseInt(e.target.value))}
                /> tier {orbTier + 1} orbs.<br/>
                <button
                    style={buttonStyle}
                    onClick={() => {
                        changeError("");
                        callCombineItem({ item_id: ITEM_MAPPINGS.RANK_ORB, new_rank: orbTier + 1, amount: orbAmt }).then(data => {
                            data.items.forEach(item => store.dispatch(changeItemAmount(item, item.amount)));
                        }).catch(e => changeError(e.message));
                    }}
                >Combine ({orbAmt * 2} orbs, {formatNumber(orbAmt * orbMana)} mana)</button><br />
                You have {formatNumber(orbsOfTier)} rank {orbTier} orbs.
            </div>

            <h2>Reinforce Coupon Combination</h2>
            <div style={{ textAlign: "center" }}>

                Combine +1 coupons into +<select
                    value={couponTier}
                    onChange={(e) => changeCouponTier(parseInt(e.target.value))}
                >
                    {[5, 10, 15, 20, 25].map(ctier => <option key={ctier} >{ctier}</option>)}
                </select> coupons: {formatNumber(couponCost)} +1 coupons and {formatNumber(couponMana)} mana per combine.
                Create <input
                    type="number"
                    value={couponAmt}
                    onChange={(e) => changeCouponAmt(parseInt(e.target.value))}
                /> +{couponTier} coupons.<br />
                <button
                    style={buttonStyle}
                    onClick={() => {
                        changeError("");
                        callCombineItem({ item_id: ITEM_MAPPINGS.REINFORCE_COUPON, new_rank: couponTier, amount: couponAmt }).then(data => {
                            data.items.forEach(item => store.dispatch(changeItemAmount(item, item.amount)));
                        }).catch(e => changeError(e.message));
                    }}
                >Combine ({formatNumber(couponCost * couponAmt)} +1 coupons, {formatNumber(couponAmt * couponMana)} mana)</button><br />
                You have {formatNumber(tier1Coupons)} +1 coupons.
            </div>
        </Modal> : null}
    </>
}

AnvilUnmapped.displayName = "Anvil";

function mapStateToProps(rootState: RootState): AnvilProps {
    return {
        items: rootState.inventory.items
    };
}

export const Anvil = connect(mapStateToProps)(AnvilUnmapped);