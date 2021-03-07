import React from "react"
import { DungeonEntrance } from "../DungeonEntrance"
import { store } from "../../redux/store";
import { DUNGEONS } from "../../combat/locationInfo";

export const Castle: React.FC<{}> = () => {
    const player = store.getState().player;

    return <div
        style={{
            position: "absolute",
            left: "25em",
            bottom: "20vh"
        }}
    >
        <DungeonEntrance
            playerDungeon={player.dungeon}
            tickets={player.tickets}
            thisDungeon={DUNGEONS.ARMORY}
        >
            <div style={{ width: "20em"}}>
                <img
                    style={{ width: "10em" }}
                    src={require("../../images/castle.png")}
                    alt="To Armory"
                    title="To Armory"
                />
                <img
                    style={{ width: "10em", transform: "scaleX(-1)" }}
                    src={require("../../images/castle.png")}
                    alt="To Armory"
                    title="To Armory"
                />
            </div>
            
        </DungeonEntrance>
    </div>
}