import { Tutorial } from "./Tutorial";
import React from "react";
import { Icon } from "../Util/Icon";

const BossFive: React.FC<{}> = () => {
    return <>
        <p>
            This tends to be just about as far as you can get on your first day. 
            So if this is still your first day, dismiss this, take a break, and relax. 
            Come back tomorrow for more progress.
        </p>
        <p>
            Oh, also this seems like a good time to mention: this is not a fast game. 
            The base unit of time for most things will be a week - quests and raids will be weekly, events will tend to last a month or two. 
        </p>
        <p>
            The main daily thing is the generation of <Icon icon="ticket" />, which are used to enter the dungeon. 
            This means you can enter once a day, or you can save up tickets and make multiple runs all in a row. 
            It's up to you.
        </p>
        <p>
            Anyways, I'll have more for you tomorrow. 
            Or as soon as you close this, depending on how long it took you to get here.
        </p>
    </>;
};

BossFive.displayName = "BossFive";

const BossFiveTutorial: Tutorial = {
    canShow: ({ floor }) => floor >= 5,
    display: BossFive,
    name: "That's it for today.",
    id: "five"
}

export { BossFiveTutorial }