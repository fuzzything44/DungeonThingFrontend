import * as React from 'react';
import { Modal } from '../../Util/Modal';
import { buttonStyle } from '../../styles';
import { GuildBonus } from './GuildBonus';
import { MemberDetails } from './MemberDetails';
import { store } from '../../redux/store';
import { setGuildMessage, setGuildDiscord } from '../../redux/guild/actions';
import { PlayerInfo, GuildBonuses, callRemoveFromGuild, callSetGuildInfo } from '../../api/ApiObjects';
import { setPlayerInfo } from '../../redux/player/actions';
import { ErrorBox } from '../../Util/ErrorBox';
import { TextInput } from '../../Util/TextInput';

interface GuildManagementProps {
    guildName: string;
    players: PlayerInfo[];
    self: PlayerInfo;
    maxSize: number;
    message: string;
    discord: string;
    bonuses: GuildBonuses;
};

export const GuildManagement: React.FC<GuildManagementProps> = (props) => {
    const [showModal, changeShowModal] = React.useState(false);
    const [error, changeError] = React.useState("");

    return <>
        <button
            style={{
                position: "absolute",
                left: "12em",
                top: "35vh",
                width: "14.5em"
            }}
            onClick={() => changeShowModal(true)}
        >
            <img
                style={{ width: "100%" }}
                src={require("../../images/guild/info.png")}
                alt="Player & Guild Info"
                title="Player & Guild Info"
            />
        </button>
        {showModal ? <Modal title="Guild Information & Management" onClose={() => changeShowModal(false)} noPad>
            {/* Guild title/banner */}
            <h2 style={{
                backgroundColor: "#CC0044",
                display: "block",
                padding: "0.5em",
                textAlign: "center",
                fontSize: "x-large",
                height: "1.5em"
            }}>
                {props.guildName}
            </h2>
            <div style={{
                height: "0.2em",
                backgroundColor: "gold",
                position: "relative",
                bottom: "0.5em"
            }} />
            <div style={{
                height: "0.2em",
                backgroundColor: "gold",
                position: "relative",
                bottom: "3.7em"
            }} />
            {/* End title/banner */}
            {error ? <ErrorBox message={error} /> : null}
            {/* Content goes in a 2-column format, if possible*/}
            <div style={{
                margin: "1em",
                width: "85vw"
            }}>
                {/* Left column - player list */}
                <div style={{ float: "left", width: "45%", paddingRight: "5%", overflow: "auto" }}>
                    <table cellPadding="5">
                        <caption><h3>Guild Roster ({props.players.length}/{props.maxSize})</h3></caption>
                        <tbody>
                            <tr>
                                {props.self.position === "GM" || props.self.position === "SUBMASTER" ? <td /> : null}
                                <td />
                                <th>Name</th>
                                <th>Last Login</th>
                            </tr>
                            {props.players.map((player, index) => <MemberDetails
                                key={index}
                                info={player}
                                self={props.self}
                                index={index}
                                changeError={changeError}
                            />)}
                        </tbody>
                    </table>
                    {<div style={{ textAlign: "center" }}>
                        <button
                            style={buttonStyle}
                            onClick={async () => {
                                try {
                                    await callRemoveFromGuild({ id: props.self.id });
                                    store.dispatch(setPlayerInfo({ guild: -1 }));
                                } catch (e) {
                                    changeError(e.message);
                                }
                            }}
                        >
                            Leave Guild
                        </button>
                    </div>}
                </div>
                {/* Right column */}
                <div style={{ float: "left", width: "45%"}}>
                    <h3>Guild Message</h3>
                    <p>{props.self.position === "MEMBER" ? props.message : <>
                        <TextInput
                            inputName="Guild Message"
                            onChange={(value) => store.dispatch(setGuildMessage(value))}
                            inputValue={props.message}
                        />
                        <br />
                        <button style={buttonStyle} onClick={async () => {
                            try {
                                await callSetGuildInfo({ motd: props.message });
                            } catch (e) {
                                changeError(e.message);
                            }
                        }}>Save Message</button>
                    </>}</p>
                    <h3>Guild Discord</h3>
                    <p>{props.self.position === "GM" ? <>
                        <TextInput
                            inputName="https://discord.gg/"
                            onChange={(value) => {
                                // Basic validation to make copy/paste easier. Remember, kids: real validation is one the server, 
                                // so don't try to get tricky with bypassing this
                                if (value.startsWith("https://discord.gg/")) {
                                    value = value.replace(/^https:\/\/discord.gg\//, "");
                                }
                                value = value.replace(/[^a-zA-Z0-9]*/g, "");
                                store.dispatch(setGuildDiscord(value));
                            }}
                            inputValue={props.discord}
                        />
                        <br />
                        <button style={buttonStyle} onClick={async () => {
                            try {
                                await callSetGuildInfo({ discord: props.discord});
                            } catch (e) {
                                changeError(e.message);
                            }
                        }}>Save Discord Link</button>
                    </> :
                        <a style={buttonStyle} href={"https://discord.gg/" + props.discord} rel="noopener noreferrer" target="_blank">Join</a>}
                    </p>
                    {/* Guild upgrades */}
                    <h3>Guild Bonuses</h3>

                    <GuildBonus
                        level={props.bonuses.members}
                        type="members"
                        canUpgrade={props.self.position !== "MEMBER"}
                        changeError={changeError}
                    />
                    <GuildBonus
                        level={props.bonuses.crit_rate}
                        type="crit_rate"
                        canUpgrade={props.self.position !== "MEMBER"}
                        changeError={changeError}
                    />
                    <GuildBonus
                        level={props.bonuses.crit_dmg}
                        type="crit_dmg"
                        canUpgrade={props.self.position !== "MEMBER"}
                        changeError={changeError}
                    />
                    <GuildBonus
                        level={props.bonuses.dmg}
                        type="dmg"
                        canUpgrade={props.self.position !== "MEMBER"}
                        changeError={changeError}
                    />
                    <GuildBonus
                        level={props.bonuses.skill_slots}
                        type="skill_slots"
                        canUpgrade={props.self.position !== "MEMBER"}
                        changeError={changeError}
                    />
                    <GuildBonus
                        level={props.bonuses.cost_reduce}
                        type="cost_reduce"
                        canUpgrade={props.self.position !== "MEMBER"}
                        changeError={changeError}
                    />
                    {/* Provides a bit of extra space at the bottom, if necessary. */}
                    <div style={{ height: "2em" }} />
                </div>
            </div>
        </Modal> : null}
    </>;
}