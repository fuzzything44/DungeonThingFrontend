import * as React from 'react';
import { Modal } from '../../Util/Modal';
import { buttonStyle } from '../../styles';
import { PlayerInfo, ApplicationInfo } from '../../api/ApiObjects';

interface ApplicationProps {
    applications: ApplicationInfo[];
    self: PlayerInfo;
};

export const GuildApplications: React.FC<ApplicationProps> = (props) => {
    const [showModal, changeShowModal] = React.useState(false);

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
            <table cellPadding="5" style={{ minWidth: "50vw" }}>
                <tbody>
                    <tr><th>Player</th><th>Max Floor Reached</th><td /><td /></tr>
                    {props.applications.map((application, index) => <tr
                        key={application.id}
                        style={{ backgroundColor: index % 2 === 1 ? "lightgray" : undefined }}
                    >
                        <td>{application.name}</td>
                        <td>{application.max_floor}</td>
                        <td><button style={buttonStyle}>Accept</button></td>
                        <td><button style={buttonStyle}>Deny</button></td>
                    </tr>)}
                </tbody>
            </table>
        </Modal> : null}
    </>;
}