import React from 'react';
import { ItemDisplay } from './inventory/ItemDisplay';
import { InventoryDisplay } from './inventory/InventoryDisplay';

function App() {
    let displays: any[] = [];
    for (let i = 1; i <= 30; i++) {
        displays.push({ amount: i, itemId: 1, itemData: i });
    }
    for (let i = 1; i <= 30; i++) {
        displays.push({ amount: i, itemId: 2, itemData: i });
    }
    displays.push({ amount: 3, itemId: 3, itemData: 2 });
    return (
        <div style={{ margin: "2em" }}>
            <InventoryDisplay items={displays} />
        </div>
  );
}

export default App;
