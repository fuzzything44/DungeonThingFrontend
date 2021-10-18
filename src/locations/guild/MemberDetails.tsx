import * as React from 'react';
import { Modal } from '../../Util/Modal';
import { backgroundSecondary, buttonStyle } from '../../styles';
import { PlayerInfo, callRemoveFromGuild, callSetGuildRank, callGuildInfo } from '../../api/ApiObjects';
import { store } from '../../redux/store';
import { removeGuildMember, setGuildInfo } from '../../redux/guild/actions';

interface MemberDetailsProps {
    info: PlayerInfo;
    self: PlayerInfo;
    index: number;
    changeError: (error: string) => void;
};

type PermissionAction = "PROMOTE" | "DEMOTE" | "LEAD" | "KICK";

interface MemberActionsProps {
    actions: PermissionAction[];
    info: PlayerInfo;
    changeError: (error: string) => void;
}

const setMemberRank = (memberId: number, rank: PlayerInfo["position"], onError: (error: string) => void) => {
    return callSetGuildRank({
        player: memberId,
        rank: rank
    }).then(() => {
        return callGuildInfo({ id: store.getState().player.guild });
    }).then((info) => {
        store.dispatch(setGuildInfo(info));
    }).catch(e => onError(e.message));
}

const MemberActions: React.FC<MemberActionsProps> = (props) => {
    const [confirmState, changeConfirmState] = React.useState<"NONE" | "LEAD" | "KICK">("NONE");

    const imageStyle = { height: "1.5em" };

    if (confirmState === "LEAD") {
        return <td>
            <Modal title="Are you sure?" onClose={() => changeConfirmState("NONE")}>
                <div style={{ textAlign: "center" }}>
                    Are you sure you want to make <b>{props.info.name}</b> the new Guild Master? After this action, you will be a Submaster of the guild.<br />
                    <button
                        style={buttonStyle}
                        onClick={() => setMemberRank(props.info.id, "GM", props.changeError).then(() => changeConfirmState("NONE"))}
                    >
                        Yes, make {props.info.name} into the new GM
                    </button>
                    <br /><br />
                    <button style={buttonStyle} onClick={() => changeConfirmState("NONE")}>No, keep me as the GM</button>
                </div>
            </Modal>
        </td>;
    } else if (confirmState === "KICK") {
        return <td>
            <Modal title="Are you sure?" onClose={() => changeConfirmState("NONE")}>
                <div style={{ textAlign: "center" }}>
                    Are you sure you want to kick <b>{props.info.name}</b> out of the guild? They'll need to re-apply and get approved to re-join the guild.<br />
                    <button
                        style={buttonStyle}
                        onClick={() => {
                            callRemoveFromGuild({ id: props.info.id })
                                .then(() => store.dispatch(removeGuildMember(props.info.id)))
                                .catch(e => props.changeError(e.message))
                                .then(() => changeConfirmState("NONE"));
                        }}
                    >
                        Yes, remove {props.info.name} from the guild
                    </button>
                    <br /><br />
                    <button style={buttonStyle} onClick={() => changeConfirmState("NONE")}>No, let them stay</button>
                </div>
            </Modal>
        </td>;
    }
    return <td>
        {props.actions.map(action => {
            switch (action) {
                case "PROMOTE":
                    return <
                        button key={action}
                        onClick={() => setMemberRank(props.info.id, "SUBMASTER", props.changeError)}
                    >
                        <img
                            style={imageStyle}
                            src={require("../../images/guild/promote.png")}
                            alt="Promote"
                            title="Promote"
                        />
                    </button>;
                case "DEMOTE":
                    return <
                        button key={action}
                        onClick={() => setMemberRank(props.info.id, "MEMBER", props.changeError)}
                    >
                        <img
                            style={imageStyle}
                            src={require("../../images/guild/demote.png")}
                            alt="Demote"
                            title="Demote"
                        />
                    </button>;
                case "LEAD":
                    return <button key={action} onClick={() => changeConfirmState("LEAD")}>
                        <img
                            style={imageStyle}
                            src={require("../../images/guild/lead.png")}
                            alt="Transfer Leader"
                            title="Transfer Leader"
                        />
                    </button>;
                case "KICK":
                    return <button key={action} onClick={() => changeConfirmState("KICK")}>
                        <img
                            style={imageStyle}
                            src={require("../../images/guild/kick.png")}
                            alt="Kick"
                            title="Kick"
                        />
                    </button>;
                default:
                    return ((_: never) => null)(action);
            }
        })}
    </td>;
}

export const MemberDetails: React.FC<MemberDetailsProps> = (props) => {
    let img = null;
    let actions = null;
    
    switch (props.info.position) {
        case "GM":
            img = <img
                src={require("../../images/guild/diamond_star.png")}
                alt="Guild Master"
                title="Guild Master"
                style={{ height: "1.5em" }}
            />;
            if (props.self.position === "GM" || props.self.position === "SUBMASTER") {
                actions = <MemberActions actions={[]} info={props.info} changeError={props.changeError} />;
            }
            break;
        case "SUBMASTER":
            img = <img
                src={require("../../images/guild/gold_star.png")}
                alt="Submaster"
                title="Submaster"
                style={{ height: "1.5em" }}
            />;
            if (props.self.position === "GM") {
                actions = <MemberActions actions={["DEMOTE", "LEAD"]} info={props.info} changeError={props.changeError} />;
            } else if (props.self.position === "SUBMASTER") {
                actions = <MemberActions actions={[]} info={props.info} changeError={props.changeError} />;
            }
            break;
        case "MEMBER":
            if (props.self.position === "GM") {
                actions = <MemberActions actions={["KICK", "PROMOTE"]} info={props.info} changeError={props.changeError} />;
            } else if (props.self.position === "SUBMASTER") {
                actions = <MemberActions actions={["KICK"]} info={props.info} changeError={props.changeError} />;
            }
            break;
        default:
            ((_: never) => null)(props.info.position)
    }
    let backgroundColor = props.index % 2 === 1 ? "lightgray" : undefined;
    if (props.self.id === props.info.id) {
        backgroundColor = backgroundSecondary.backgroundColor;
    }

    return <tr
        style={{ backgroundColor }}
    >
        {actions}
        <td>{img}</td>
        <td>{props.info.name}</td>
        <td>{new Date(props.info.last_login).toDateString()}</td>
    </tr>;
}