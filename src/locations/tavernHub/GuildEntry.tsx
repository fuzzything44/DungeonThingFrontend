import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { LOCATIONS } from '../locations';
import { connect } from 'react-redux';
import { Modal } from '../../Util/Modal';
import { buttonStyle } from '../../styles';

interface GuildEntryProps {
    inGuild: boolean;
}

const GuildEntryUnmapped: React.FC<GuildEntryProps> = (props) => {
    const [modalOpen, changeModalOpen] = React.useState(false);

    const styling: React.CSSProperties = {
        position: "absolute",
        left: "50em",
        top: "calc(36.3vh - 10em)",
        height: "10em"
    }
    const image = <img
        style={{ height: "100%" }}
        src={require("../../images/tavern/guild_door.png")}
        alt="Guild Hall"
        title="Guild Hall"
    />;

    if (props.inGuild === true) {
        if (modalOpen) {
            return <Redirect to={LOCATIONS.GUILD} />;
        }

        return <Link
            to={LOCATIONS.GUILD}
            style={styling}
        >
            {image}
        </Link>;
    }
    return <>
        <button style={styling} onClick={() => changeModalOpen(true)}>{image}</button>
        {modalOpen ? <Modal title="Join a Guild" onClose={() => changeModalOpen(false)}>
            You're not currently in a guild.<br />
            <section style={{ margin: "0.5em", textAlign: "center" }}>
                <h2 style={{ display: "block" }}>Join a guild</h2>
                <label>Guild Name: <input type="text" /></label><br />
                <button style={{ ...buttonStyle, marginTop: "0.2em" }}>Apply to Guild</button>
            </section>
            <section style={{ margin: "0.5em", textAlign: "center" }}>
                <h2 style={{ display: "block" }}>Create a Guild</h2>
                Creating a guild will cost X<br/>
                <label>Guild Name: <input type="text" /></label><br />
                <button style={{ ...buttonStyle, marginTop: "0.2em" }}>Create Guild</button>
            </section>
        </Modal> : null}
    </>;
}

function mapStateToProps(state: RootState): GuildEntryProps {
    return {
        inGuild: state.player.guild !== -1
    };
}

export const GuildEntry = connect(mapStateToProps)(GuildEntryUnmapped);