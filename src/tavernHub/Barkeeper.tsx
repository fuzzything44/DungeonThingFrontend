import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Modal } from '../Util/Modal';
import { PAGES } from '../App';
import { buttonStyle } from '../styles';
import { formatNumber } from '../Util/numberFormat';
import { Icon } from '../Util/Icon';
import { callEnterDungeon, callStatus } from '../api/ApiObjects';
import { ErrorBox } from '../Util/ErrorBox';
import { store } from '../redux/store';
import { setPlayerInfo, setManaRate } from '../redux/player/actions';

interface BarkeeperProps {
    dungeonName: string;
    dungeonFloor: number;
    tickets: number;
    dungeonId: number;
}

const Barkeeper: React.FC<BarkeeperProps> = (props) => {
    const [dialog, changeDialog] = React.useState<"CLOSED" | "OPEN" | "RESET">("CLOSED");
    const [error, changeError] = React.useState("");
    const [redirect, changeRedirect] = React.useState("");

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return <>
        <button
            style={{
                position: "absolute",
                left: "40em",
                top: "calc(36.2vh - 7em)",
                height: "7em"
            }}
            onClick={() => changeDialog("OPEN")}
        >
            <img
                style={{ height: "100%" }}
                src={require("../images/barkeeper.png")}
                alt="Barkeeper"
                title="Barkeeper"
            />
        </button>
        {dialog === "OPEN" ? <Modal
            title="Talking with the Barkeeper"
            onClose={() => changeDialog("CLOSED")}
        >
            Hello there!<br />
            Would you like to {" "}
            <Link style={buttonStyle} to={PAGES.COMBAT}>return</Link> {" "}
            to floor {formatNumber(props.dungeonFloor)} of the {props.dungeonName}? <br />
            <br />
            What about <button
                style={buttonStyle}
                onClick={() => {
                    changeDialog("RESET");
                    changeError("");
                }}
            >reset</button> the {props.dungeonName}?
            (You have {props.tickets} <Icon icon="ticket" />)
            <br />
        </Modal> : null}
        {dialog === "RESET" ? <Modal
            title="Talking with the Barkeeper"
            onClose={() => changeDialog("CLOSED")}
        >
            {error ? <ErrorBox message={error} /> : null}
            Resetting the {props.dungeonName} will cost you 1 <Icon icon="ticket" /> (you have {props.tickets} remaining)<br />
            In exchange, you'll be brought back to floor 1, where you can kill all those easy bosses again for more loot.<br />
            <div style={{ textAlign: "center", margin: "0.5em" }}>
                {props.tickets ? <>
                    <button style={buttonStyle} onClick={async () => {
                        try {
                            // eslint-disable-next-line
                            const [_, status] = await Promise.all([callEnterDungeon({ dungeon: props.dungeonId }),  callStatus({})]);
                            store.dispatch(setPlayerInfo(status));
                            store.dispatch(setManaRate(0));
                            changeRedirect(PAGES.COMBAT);
                        } catch (e) {
                            changeError(e.message);
                        }
                    }}
                    >
                        Reset
                    </button>
                    <br />
                    <br />
                </> : null}
                <button style={buttonStyle} onClick={() => changeDialog("OPEN")}>Nevermind</button>
            </div>
        </Modal> : null}
    </>
}

Barkeeper.displayName = "Barkeeper";

export { Barkeeper }