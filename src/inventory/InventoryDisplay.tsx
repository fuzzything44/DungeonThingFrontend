import * as React from 'react';
import { ItemInfo } from '../api/ApiObjects';
import { ItemDisplay } from './ItemDisplay';

interface InventoryProps {
    items: ItemInfo[]
}

const InventoryDisplay: React.FC<InventoryProps> = (props) => {
    let displays: any[] = [];
    props.items.forEach(item => displays.push(<ItemDisplay amount={item.amount} itemId={item.itemId} itemData={item.itemData} key={item.itemId.toString() + "," + item.itemData.toString()} />));

    return <div>
        {displays}
    </div>;
}

InventoryDisplay.displayName = "InventoryDisplay";
export { InventoryDisplay };