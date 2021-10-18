import * as React from 'react';
import { Modal } from '../../Util/Modal';
import { buttonStyle } from '../../styles';
import { PlayerInfo, ApplicationInfo, callHandleGuildApplication, callGuildInfo } from '../../api/ApiObjects';
import { ErrorBox } from '../../Util/ErrorBox';
import { store } from '../../redux/store';
import { setGuildInfo, removeGuildApplication } from '../../redux/guild/actions';

interface ApplicationProps {
    applications: ApplicationInfo[];
    self: PlayerInfo;
};

export const GuildApplications: React.FC<ApplicationProps> = (props) => {
    const [showModal, changeShowModal] = React.useState(false);
    const [error, changeError] = React.useState("");

    if (props.self.position === "MEMBER" || props.applications.length === 0) {
        return null;
    }

    return <>
        <button
            style={{
                position: "absolute",
                left: "15em",
                top: "50vh",
                width: "10em"
            }}
            onClick={() => changeShowModal(true)}
        >
            <img
                style={{ width: "100%", height: "100%" }}
                src={require("../../images/guild/mail.png")}
                alt="Handle Applications"
                title="Handle Applications"
            />
        </button>
        {showModal ? <Modal title="Guild Applications" onClose={() => changeShowModal(false)} noPad>
            {error ? <ErrorBox message={error} /> : null}
            <table cellPadding="5" style={{ minWidth: "50vw", textAlign: "left" }}>
                <tbody>
                    <tr><th>Player</th><th>Max Floor Reached</th><td /><td /></tr>
                    {props.applications.map((application, index) => <tr
                        key={application.id}
                        style={{ backgroundColor: index % 2 === 1 ? "lightgray" : undefined }}
                    >
                        <td>{application.name}</td>
                        <td>{application.max_floor}</td>
                        <td><button style={buttonStyle} onClick={() => {
                            callHandleGuildApplication({ char_id: application.id, accept: true }).then(() => {
                                callGuildInfo({ id: store.getState().player.guild }).then(info => {
                                    store.dispatch(setGuildInfo(info));
                                });
                            }).catch((e) => {
                                changeError(e.message);
                            });
                        }}>Accept</button></td>
                        <td><button style={buttonStyle} onClick={() => {
                            callHandleGuildApplication({ char_id: application.id, accept: false }).then(() => {
                                store.dispatch(removeGuildApplication(application.id));
                            }).catch((e) => {
                                changeError(e.message);
                            });
                        }}>Deny</button></td>
                    </tr>)}
                </tbody>
            </table>
        </Modal> : null}
    </>;
}