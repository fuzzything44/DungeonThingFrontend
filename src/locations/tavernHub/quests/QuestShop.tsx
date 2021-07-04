import * as React from 'react';
import { Icon } from '../../../Util/Icon';
import { Shop } from '../../../Util/Shop';

interface QuestShopProps {
    gold: number;
}

const QuestShop: React.FC<QuestShopProps> = (props) => {
    return <div style={{ minWidth: "20em" }}>
        <h2 style={{ width: "100%", textAlign: "center" }}>
            Quest Shop
        </h2>
        <div style={{ textAlign: "center" }}>You have {props.gold} <Icon icon="gold" /></div>
        <Shop items={[
            {
                name: "Elemental Totem",
                internalName: "totem",
                costs: [{ material: <Icon icon="gold" />, held: props.gold, amount: 50 }]
            }
        ]}
            shopName="quest"
        />
    </div>
}

QuestShop.displayName = "QuestShop";

export { QuestShop }