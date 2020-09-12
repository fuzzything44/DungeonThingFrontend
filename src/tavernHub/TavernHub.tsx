import * as React from 'react';
import { InstanceMenu } from '../InstanceMenu';
import { Modal } from '../Util/Modal';
import { border, backgroundSecondary, buttonStyle } from '../styles';
import { formatNumber } from '../Util/numberFormat';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { Icon } from '../Util/Icon';
import { Link } from 'react-router-dom';
import { PAGES } from '../App';

interface StateProps {
    dungeonName: string;
    dungeonFloor: number;
    tickets: number;
};

type TavernHubProps = StateProps;

const TavernHubUnmapped: React.FC<TavernHubProps> = (props) => {
    const [dialog, changeDialog] = React.useState<"CLOSED" | "OPEN" | "RESET">("CLOSED");

    return <div style={{
        height: "100vh",
        width: "max(100vw, 40em)"
    }}>
        {/* Background parts */}
        <div style={{
            float: "left",
            width: "25em",
            height: "100%",
            backgroundImage: `url(${require("../images/tavern_left.png")})`,
            backgroundSize: "25em 100%",
        }}>
        </div>
        <div style={{
            float: "left",
            width: "calc(100% - 25em)",
            height: "100%",
            backgroundImage: `url(${require("../images/tavern_inside_repeat.png")})`,
            backgroundSize: "25em 100%",
            backgroundRepeat: "repeat-x"
        }}>
        </div>
        <button
            style={{
                position: "absolute",
                left: "30em",
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
        <InstanceMenu />
        {dialog === "OPEN" ? <Modal title="Talking with the Barkeeper" onClose={() => changeDialog("CLOSED")}>
            Hello there!<br />
            Would you like to {" "}
            <Link style={buttonStyle} to={PAGES.COMBAT}>return</Link> {" "}
            to floor {formatNumber(props.dungeonFloor)} of the {props.dungeonName}? <br />
            <br />
            What about <button style={buttonStyle} onClick={() => changeDialog("RESET")}>reset</button> the {props.dungeonName}?
            (You have {props.tickets} <Icon image={require("../images/ticket.png")} name="Dungeon entry ticket" />)
            <br />
        </Modal> : null}
        {dialog === "RESET" ? <Modal title="Talking with the Barkeeper" onClose={() => changeDialog("CLOSED")}>
            Resetting the {props.dungeonName} will cost you 1 <Icon image={require("../images/ticket.png")} name="Dungeon entry ticket" /> (you have {props.tickets} remaining)<br />
            In exchange, you'll be brought back to floor 1, where you can kill all those easy bosses again for more loot.<br />
            <div style={{ textAlign: "center", margin: "0.5em" }}>
                {props.tickets ? <><button style={buttonStyle} onClick={() => {
                    alert("TODO");
                }}>Reset</button><br /><br /></> : null}
                <button style={buttonStyle} onClick={() => changeDialog("OPEN")}>Nevermind</button>
            </div>
        </Modal> : null}
    </div>;
}

TavernHubUnmapped.displayName = "TavernHub";


const mapStateToProps = (state: RootState): StateProps => {
    return {
        dungeonName: "Tavern Cellar",
        dungeonFloor: state.player.floor,
        tickets: state.player.tickets
    };
}

let TavernHub = connect(mapStateToProps)(TavernHubUnmapped);

export { TavernHub };