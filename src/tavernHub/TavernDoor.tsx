import * as React from 'react';
import { PAGES } from '../App';
import { Redirect } from 'react-router-dom';
import { Modal } from '../Util/Modal';
import { Icon } from '../Util/Icon';
import { buttonStyle } from '../styles';
import { callEnterDungeon } from '../api/ApiObjects';
import { ErrorBox } from '../Util/ErrorBox';

interface TavernDoorProps {
    dungeonId: number;
    tickets: number
}

const TavernDoor: React.FC<TavernDoorProps> = (props) => {
    const [modalOpen, changeOpen] = React.useState(false);
    const [redirect, changeRedirect] = React.useState("");
    const [error, changeError] = React.useState("");

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return <>
        <button
            style={{
                position: "absolute",
                left: "31em",
                bottom: "63.7vh",
                height: "9em"
            }}
            onClick={() => {
                if (props.dungeonId === 1) {
                    changeRedirect(PAGES.COMBAT);
                } else {
                    changeOpen(true);
                    changeError("");
                }
            }}
        >
            <img
                style={{ height: "100%" }}
                src={require("../images/door.png")}
                alt="To Cellar"
                title="To Cellar"
            />
        </button>
        {modalOpen ? <Modal onClose={() => changeOpen(false)} title="Enter the Tavern Cellar?">
            {error ? <ErrorBox message={error} /> : null}
            Would you like to enter the Tavern Cellar? This will cost 1 <Icon icon="ticket" /> (you have {props.tickets}), and will cause you to exit your current dungeon. <br />
            <button
                style={buttonStyle}
                onClick={async () => {
                    try {
                        await callEnterDungeon({ dungeon: 1 });
                    } catch (e) {
                        changeError(e.message);
                    }
                }}
            >
                Enter Tavern Cellar
            </button>
        </Modal> : null}
    </>
}

TavernDoor.displayName = "TavernDoor";

export { TavernDoor }