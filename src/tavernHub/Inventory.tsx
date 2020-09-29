import * as React from 'react';
import { PAGES } from '../App';
import { Link } from 'react-router-dom';

interface InventoryProps {
}

const Inventory: React.FC<InventoryProps> = (props) => {
    return <Link
        to={PAGES.INVENTORY}
        style={{
            position: "absolute",
            left: "26em",
            bottom: "58vh",
            height: "3em"
        }}
    >
        <img
            style={{ height: "100%" }}
            src={require("../images/lootbag.png")}
            alt="Inventory"
            title="Inventory"
        />
    </Link>
}

Inventory.displayName = "Inventory";

export { Inventory }