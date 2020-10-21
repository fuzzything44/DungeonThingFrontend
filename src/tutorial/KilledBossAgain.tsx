import { Tutorial } from "./Tutorial";
import React from "react";

const KilledBossAgain: React.FC<{}> = () => {
    return <>
        <p>
            That was probably a lot easier this time around.
        </p>
        <p>
            By now, you've gotten a couple boss drops.
            You may have noticed that not every boss kill drops an equip - that's expected. 
            Stronger bosses drop more equips, and eventually you'll be getting multiple equips every boss killed!
            Also, you're guaranteed to get a drop from the first boss in the tavern cellar.
        </p>
        <p>
            However, most boss drops aren't very good, and even if they're better than what you have, then you still have the old equip to deal with.
            To deal with extra equips, you can destroy them.
        </p>
        <p>
            Destroying an equip gives a rank up orb (and maybe other items) - destroying a rank 1 (broken) equip gives a rank 1 rank up orb.
            Destroying a rank 2 (damaged) equip gives a rank 2 orb. And so on.
            These orbs can be used to rank up equipment, increasing their stats and increasing the maximum level by 5.
            Ranking up an equip takes an equal rank orb - for example, ranking up a broken equip takes a rank 1 orb, gained
            from destroying a broken equip.
        </p>
        <p>
            A good general pattern is to destroy extra equips, and use the orbs to rank up your equipped gear.
            Then, once you have higher rank gear than most drops will get, use orbs to rank up spare gear, and destroy that spare gear for higher rank orbs.
        </p>
        <p>
            Ranking up equipment is an important way to keep being able to grow your strength.
        </p>
    </>;
};

KilledBossAgain.displayName = "KilledBossAgain";

const KilledBossAgainTutorial: Tutorial = {
    canShow: ({ floor }) => floor > 1,
    display: KilledBossAgain,
    name: "Another rat down",
    id: "firstkillagain"
}

export { KilledBossAgainTutorial }