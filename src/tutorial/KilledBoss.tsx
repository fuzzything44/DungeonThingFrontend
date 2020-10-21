import { Tutorial } from "./Tutorial";
import React from "react";
import { Icon } from "../Util/Icon";

const KilledBoss: React.FC<{}> = () => {
    return <>
        <p>
            Congratulations on defeating your first boss!
        </p>
        <p>
            Bosses give much bigger rewards than regular enemies - high <Icon icon="mana" /> drops and potentially useful equipment and items.
        </p>
        <p>
            Each boss is harder than the previous, meaning you'll need to get stronger to keep progressing.
            The best way to get stronger right now is to improve your equipment.
        </p>
        <p>
            You now have enough mana to level up your equips a bit - click on the mug icon in the top right to go to the tavern.
            Then, click the lootbag to go to your inventory.
        </p>
        <p>
            At your inventory, you can see all your currently equipped pieces, along with spare pieces and items.
            Click "Upgrade" on your weapon, and level it up as much as you can. This improves your damage, letting you kill enemies and bosses faster. A few upgrades of it will let you defeat another boss.
        </p>
        <p>
            Upgrade and keep fighting bosses! I'll see you again at floor 5.
        </p>
    </>;
};

KilledBoss.displayName = "KilledBoss";

const KilledBossTutorial: Tutorial = {
    canShow: ({ floor }) => floor > 1,
    display: KilledBoss,
    name: "That was a big rat.",
    id: "firstkill"
}

export { KilledBossTutorial }