import { Tutorial } from "./Tutorial";
import React from "react";
import { Icon } from "../Util/Icon";

const NewPlayer: React.FC<{}> = () => {
    return <>
        <p>
            Hello and welcome to Tavern Cellar!
        </p>
        <p>
            You automatically fight enemies while you're waiting, and the fighting continues offline.
            Defeating enemies will give you <Icon icon="mana" />, the main currency of the game.
        </p>
        <p>
            Your first goal is to defeat the floor 1 boss. You can attempt to fight it by clicking the "challenge boss" button.
            Then, once you finish up the current combat you'll fight the boss next.
            If you beat the boss, you'll progress to the next floor with harder enemies and more mana drops.
        </p>
        <p>
            Defeating bosses also gets you equipment drops, which can be used to improve your gear.
        </p>
    </>;
};

NewPlayer.displayName = "NewPlayer";

const NewPlayerTutorial: Tutorial = {
    canShow: () => true,
    display: NewPlayer,
    name: "Welcome to Tavern Cellar!",
    id: "new"
}

export { NewPlayerTutorial }