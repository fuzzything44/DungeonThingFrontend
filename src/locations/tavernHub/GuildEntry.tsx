import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RootState, store } from '../../redux/store';
import { LOCATIONS } from '../locations';
import { connect } from 'react-redux';
import { Modal } from '../../Util/Modal';
import { buttonStyle } from '../../styles';
import { callApplyToGuild, callCreateGuild } from '../../api/ApiObjects';
import { TextInput } from '../../Util/TextInput';
import { ErrorBox } from '../../Util/ErrorBox';
import { setPlayerInfo } from '../../redux/player/actions';

interface GuildEntryProps {
    inGuild: boolean;
    maxFloor: number;
}

const GuildEntryUnmapped: React.FC<GuildEntryProps> = (props) => {
    const [modalOpen, changeModalOpen] = React.useState(false);
    const [error, changeError] = React.useState("");
    const [applied, changeApplied] = React.useState<"NONE" | "APPLY" | "CREATE">("NONE");
    const [guildName, changeGuildName] = React.useState("");
    const [newGuildName, changeNewGuildName] = React.useState("");

    const closeModal = React.useCallback(() => changeModalOpen(false), []);
    const applyOnClick = React.useCallback(async () => {
        try {
            changeError("");
            changeApplied("APPLY");
            await callApplyToGuild({ name: guildName.replace(/ /g, "_") });
        } catch (e) {
            changeError(e.message);
            changeApplied("NONE");
        }
    }, [guildName]);

    const createOnClick = React.useCallback(async () => {
        try {
            changeError("");
            changeApplied("CREATE");
            const guildId = await callCreateGuild({ name: newGuildName.replace(/ /g, "_") });
            store.dispatch(setPlayerInfo({ guild: guildId.id }));
        } catch (e) {
            changeError(e.message);
            changeApplied("NONE");
        }
    }, [newGuildName]);

    if (props.maxFloor < 35) {
        return null;
    }

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

    let innerContent: React.ReactNode = <></>;
    switch (applied) {
        case "NONE": 
            innerContent = <>
                You're not currently in a guild.<br />
                <section style={{ margin: "0.5em", textAlign: "center" }}>
                    <h2 style={{ display: "block" }}>Join a guild</h2>
                    <TextInput inputName="Guild Name" inputValue={guildName} onChange={changeGuildName} />
                    <button style={{ ...buttonStyle, marginTop: "0.2em" }} onClick={applyOnClick}>
                        Apply to Guild
                    </button>
                </section>
                <section style={{ margin: "0.5em", textAlign: "center" }}>
                    <h2 style={{ display: "block" }}>Create a Guild</h2>
                    Creating a guild will cost X<br />
                    <TextInput inputName="Guild Name" inputValue={newGuildName} onChange={changeNewGuildName} />
                    <button style={{ ...buttonStyle, marginTop: "0.2em" }} onClick={createOnClick}>
                        Create Guild
                    </button>
                </section>
            </>;
            break;
        case "APPLY":
            innerContent = "Thanks, your application is being processed.";
            break;
        case "CREATE":
            innerContent = "Loading...";
            break;
        default:
            ((_: never) => null)(applied);
    }
    return <>
        <button style={styling} onClick={() => changeModalOpen(true)}>{image}</button>
        {modalOpen ? <Modal title="Join a Guild" onClose={closeModal}>
            {error ? <ErrorBox message={error} /> : null}
            {innerContent}
        </Modal> : null}
    </>;
}

function mapStateToProps(state: RootState): GuildEntryProps {
    return {
        inGuild: state.player.guild !== -1,
        maxFloor: state.player.max_floor
    };
}

export const GuildEntry = connect(mapStateToProps)(GuildEntryUnmapped);