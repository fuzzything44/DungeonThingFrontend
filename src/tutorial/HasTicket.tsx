import { Tutorial } from "./Tutorial";
import React from "react";
import { Icon } from "../Util/Icon";

const HasTicket: React.FC<{}> = () => {
    return <>
        <p>
            Welcome back! You've now acquired another <Icon icon="ticket" />. 
            You get one of these each day.
        </p>
        <p>
            Tickets let you enter or reset dungeons. 
            In your case, you'll want to reset the tavern cellar.
            To reset the tavern cellar, talk with the bar keeper. 
            Click on the mug in the top right, then click on the bar keeper. 
            Then, follow their dialogue to reset the tavern cellar.
        </p>
        <p>
            Resetting a dungeon costs 1 ticket, and brings you back to floor 1.
            However, you keep all your items, equipment, mana, etc. 
            Only the dungeon is reset.
            This allows you to quickly get back to your old floor, but with more boss loot!
        </p>
        <p>
            The other use of tickets is to enter a new dungeon. 
            You exit your current dungeon, and start on floor 1 of the new dungeon (no matter where you were previously).
            In a way, you can think of resetting a dungeon as exiting and re-entering your current dungeon.
            (Note: currently, there are no other available dungeons to enter. The Armory is coming soon!)
        </p>
    </>;
};

HasTicket.displayName = "HasTicket";

const HasTicketTutorial: Tutorial = {
    canShow: ({ tickets }) => tickets >= 1,
    display: HasTicket,
    name: "Welcome to day 2.",
    id: "day2"
}

export { HasTicketTutorial }