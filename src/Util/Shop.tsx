import * as React from 'react';
import { buttonStyle } from '../styles';
import { Modal } from './Modal';
import { callBuyShopItem, callStatus, BuyShopItemResponse, StatusResponse } from '../api/ApiObjects';
import { store } from '../redux/store';
import { setPlayerInfo } from '../redux/player/actions';

interface ShopCost {
    material: React.ReactNode;
    amount: number;
    held: number;
}
interface ShopItem {
    name: string;
    costs: ShopCost[];
    maxBuyable?: number;
    internalName: string;
}

interface ShopProps {
    items: ShopItem[];
    shopName: string;
}

const ShopItem: React.FC<{ item: ShopItem, shop: string }> = (props) => {
    const [buyAmount, setBuyAmount] = React.useState(1);
    const [purchaseState, setPurchaseState] = React.useState<"NONE" | "PENDING" | "SUCCESS" | "FAIL">("NONE");
    const [error, changeError] = React.useState("");

    const givenMax = props.item.maxBuyable == null ? Infinity : props.item.maxBuyable;
    const maxBuyable = Math.floor(Math.min(givenMax, ...props.item.costs.map(cost => cost.held / cost.amount)));

    const buyItem = async () => {
        setPurchaseState("PENDING");
        try {
            const [, status] = await Promise.all<BuyShopItemResponse, StatusResponse>([
                callBuyShopItem({ shop: props.shop, entry: props.item.internalName, amount: buyAmount }),
                callStatus({})
            ]);

            store.dispatch(setPlayerInfo(status));
            setPurchaseState("SUCCESS");
        } catch (e) {
            changeError(e.message);
            setPurchaseState("FAIL");
        }
    }
    return <tr>
        <td style={{ paddingRight: "2em" }}><label htmlFor={props.item.internalName + "_amt"}>{props.item.name}</label></td>
        <td style={{ paddingRight: "2em" }}>{props.item.costs.map((cost, index) => <div key={index}>{cost.amount}{cost.material}</div>)}</td>
        <td style={{ paddingRight: "2em" }}>{maxBuyable}</td>
        <td style={{ paddingRight: "2em" }}>
            <button style={buttonStyle} onClick={buyItem}>Buy</button>
        </td>
        <td>
            <input
                id={props.item.internalName + "_amt"}
                type="number" max={maxBuyable}
                min={1}
                onChange={e => {
                    const rawAmount = parseInt(e.target.value);
                    if (isNaN(rawAmount)) {
                        setBuyAmount(0);
                    } else {
                        setBuyAmount(Math.max(1, Math.min(maxBuyable, rawAmount)));
                    }
                }}
                value={buyAmount === 0 ? "" : buyAmount}
            />
        </td>
        {purchaseState !== "NONE" ? <Modal
            onClose={() => purchaseState !== "PENDING" ? setPurchaseState("NONE") : null}
            title="Buying item..."
            hideClose={purchaseState === "PENDING"}
        >
            {purchaseState === "PENDING" ? "Purchasing item..." : null}
            {purchaseState === "FAIL" ? "Failed to buy item: " + error : null}
            {purchaseState === "SUCCESS" ? "Successfully purchased item!" : null}
            {purchaseState !== "PENDING" ? <button style={buttonStyle} onClick={() => setPurchaseState("NONE")}>Close</button> : null}
        </Modal> : null}
    </tr>;
}


const Shop: React.FC<ShopProps> = (props) => {
    return <table style={{ border: "none" }}>
        <tbody>
            <tr>
                <th style={{paddingRight: "2em"}}>For Sale</th>
                <th style={{ paddingRight: "2em" }}>Costs</th>
                <th style={{ paddingRight: "2em" }}>Max Affordable</th>
                <th style={{ paddingRight: "2em" }}>Buy</th>
                <th>Buy Amount</th>
            </tr>
            {props.items.map((item, index) => <ShopItem key={index} item={item} shop={props.shopName} />)}
        </tbody>
    </table>;
}

Shop.displayName = "Shop";

export { Shop }