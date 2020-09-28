import * as React from "react";
import { EquipInfo, callLevelEquip, callEquipInfo } from "../../api/ApiObjects";
import { UpgradeBase } from "./UpgradeBase";
import { store } from "../../redux/store";
import { setMana } from "../../redux/player/actions";
import { pause } from "../../Util/pause";
import { UpgradeModes } from "../UpgradeEquip";
import { buttonStyle } from "../../styles";
import { ErrorBox } from "../../Util/ErrorBox";
import { formatNumber } from "../../Util/numberFormat";
import { setEquipInfo } from "../../redux/inventory/actions";

interface LevelUpProps {
    equip: EquipInfo;
    changeMode: (newMode: UpgradeModes) => void;
}

const LevelUp: React.FC<LevelUpProps> = (props) => {
    const [error, changeError] = React.useState("");
    const [animating, changeAnimating] = React.useState(false);

    return <UpgradeBase
        name="Level Up"
        equip={props.equip}
        imageElements={animating ? <>
            {Array.from(Array(8).keys()).map((index) => {
                return <div
                    style={{
                        transform: `rotate(${45 * index}deg)`,
                        transformOrigin: "top left",
                        position: "absolute",
                        top: "1.5em",
                        left: "1.5em",
                        width: "2em"
                    }}
                    key={index}
                >
                    <div style={{
                        border: "1px solid #EED202",
                        animation: "level-up 0.5s infinite",
                        // Random delays so there's not a spiral pattern
                        animationDelay: `-${[0, 6, 3, 7, 4, 2, 1, 5][index] / 10}s`
                    }} />
                </div>
            })}
        </> : null}
    >
        Level {props.equip.level} / {props.equip.max_level}<br />
        <button
            style={buttonStyle}
            onClick={async () => {
                if (props.equip.level < props.equip.max_level) {
                    changeAnimating(true);
                    try {
                        // Animate for 3s or until API call returns
                        const [level, info] = await Promise.all([
                            callLevelEquip({ id: props.equip.id }),
                            callEquipInfo({ id: props.equip.id }),
                            pause(2)]);
                        store.dispatch(setMana(level.mana));
                        store.dispatch(setEquipInfo(info.info));
                    } catch (error) {
                        changeError(error.message);
                    }
                    changeAnimating(false);
                } else {
                    props.changeMode(UpgradeModes.RANK_UP);
                }

            }}
        >
            {props.equip.level < props.equip.max_level ? `Level Up (${formatNumber(props.equip.level_cost)} mana)` : "Move to Rank Up"}
        </button>
        {error ? <ErrorBox message={error} /> : null}
    </UpgradeBase>
}

LevelUp.displayName = "LevelUp";

export { LevelUp } 