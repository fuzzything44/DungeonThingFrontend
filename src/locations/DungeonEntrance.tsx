import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { getLocationInfo } from '../combat/locationInfo';
import { PAGES } from '../pages';
import { Modal } from '../Util/Modal';
import { ErrorBox } from '../Util/ErrorBox';
import { Icon } from '../Util/Icon';
import { buttonStyle } from '../styles';
import { callEnterDungeon, callStatus, callUpdate, EnterDungeonResponse, StatusResponse, UpdateResponse } from '../api/ApiObjects';
import { store } from '../redux/store';
import { setPlayerInfo, setManaRate } from '../redux/player/actions';

interface DungeonEntranceProps {
    playerDungeon: number;
    tickets: number;
    thisDungeon: number;
}

const DungeonEntrance: React.FC<DungeonEntranceProps> = (props) => {
    const [modalOpen, changeOpen] = React.useState(false);
    const [redirect, changeRedirect] = React.useState("");
    const [error, changeError] = React.useState("");

    if (redirect) {
        return <Redirect push to={redirect} />;
    }

    const dungeonInfo = getLocationInfo(props.thisDungeon, 1);

    return <>
        <button
            style={{
                height: "100%",
                width: "100%"
            }}
            onClick={() => {
                if (props.playerDungeon === props.thisDungeon) {
                    changeRedirect(PAGES.COMBAT);
                } else {
                    changeOpen(true);
                    changeError("");
                }
            }}
        >
            {props.children}
        </button>
        {modalOpen ? <Modal onClose={() => changeOpen(false)} title={`Enter the ${dungeonInfo.dungeonName}?`}>
            {error ? <ErrorBox message={error} /> : null}
            Would you like to enter the {dungeonInfo.dungeonName}? This will cost 1 <Icon icon="ticket" /> (you have {props.tickets}), and will cause you to exit your current dungeon. <br />
            <button
                style={buttonStyle}
                onClick={async () => {
                    try {
                        const [, status, update] = await Promise.all([
                            callEnterDungeon({ dungeon: props.thisDungeon }),
                            callStatus({}),
                            callUpdate({})
                        ]) as [EnterDungeonResponse, StatusResponse, UpdateResponse];
                        store.dispatch(setPlayerInfo(status));
                        if ("per_min" in update.result) {
                            store.dispatch(setManaRate(update.result.per_min));
                        }
                        changeRedirect(PAGES.COMBAT);
                    } catch (e) {
                        changeError(e.message);
                    }
                }}
            >
                Enter {dungeonInfo.dungeonName}
            </button>
        </Modal> : null}
    </>
}

DungeonEntrance.displayName = "DungeonEntrance";

export { DungeonEntrance }