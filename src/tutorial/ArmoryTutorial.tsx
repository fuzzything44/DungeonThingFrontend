import { Tutorial } from "./Tutorial";
import React from "react";
import { ARMORY_UNLOCK_FLOOR } from "../locations/tavernHub/ExitDoor";

const Armory: React.FC<{}> = () => {
    return <>
        <p>
            You've unlocked the Armory!
        </p>
        <p>
            By now, you may have discovered equipment reinforcing, another way to grow your strength. 
            If you haven't, good job getting here without it! Now go check out it's forge tab.
            However, reinforce coupons have been scarce. 
        </p>
        <p>
            The armory fixes this - go there once and you'll have loads of coupons, even though they're low level. 
            You can now access it through the tavern hub. 
            Take the door out to town, and then it'll be in the castle.
        </p>
        <p>
            As with rank orbs, eventually you'll be able to combine all these weak coupons into a smaller number of stronger ones, reducing clicks. 
        </p>
    </>;
};

Armory.displayName = "Armory";

const ArmoryTutorial: Tutorial = {
    canShow: ({ floor }) => floor >= ARMORY_UNLOCK_FLOOR,
    display: Armory,
    name: "The Armory",
    id: "armory"
}

export { ArmoryTutorial }