import * as React from 'react';
import { InstanceMenu } from '../../InstanceMenu';
import { isLoggedIn, playerId } from '../../api/makeCall';
import { BackArrow } from './BackArrow';
import { GuildManagement } from './GuildManagement';
import { Treasury } from './Treasury';
import { RootState, store } from '../../redux/store';
import { connect } from 'react-redux';
import { GuildApplications } from './GuildApplications';
import { Redirect } from 'react-router-dom';
import { ItemInfo, PlayerInfo, ApplicationInfo, GuildBonuses, callGuildInfo } from '../../api/ApiObjects';
import { PAGES } from '../../pages';
import { setGuildInfo } from '../../redux/guild/actions';
import { ErrorBox } from '../../Util/ErrorBox';

interface StateProps {
    guildName: string;
    players: PlayerInfo[];
    playerId: number;
    guildId: number;
    maxSize: number;
    message: string;
    discord: string;
    bonuses: GuildBonuses;
    applications: ApplicationInfo[];
    mana: number;
    gold: number;
    items: ItemInfo[];
    gp: number;
};

type GuildHallProps = StateProps;

const GuildHallUnmapped: React.FC<GuildHallProps> = (props) => {
    const [error, changeError] = React.useState("");

    React.useEffect(() => {
        callGuildInfo({ id: props.guildId })
            .then(info => store.dispatch(setGuildInfo(info)))
            .catch((e) => changeError(e.message));
    }, [props.guildId]);

    if (!isLoggedIn()) {
        return <Redirect to={PAGES.LOGIN} />;
    }

    let self = props.players.find(player => player.id === props.playerId);
    if (self === undefined) {
        self = {
            id: props.playerId,
            name: "",
            last_login: new Date().toString(),
            position: "MEMBER"
        };
    }

    return <div style={{
        height: "100vh",
        width: "max(100vw, 62em)"
    }}>
        {/* Background */}
        <div style={{
            float: "left",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${require("../../images/guild/guild_repeat.png")})`,
            backgroundSize: "25em 100%",
            backgroundRepeat: "repeat-x"
        }} />
        {error ? <div style={{ position: "absolute", padding: "5%" }}>
            <ErrorBox message={"Could not get guild information: " + error} />
        </div> : null}
        <BackArrow />
        <GuildManagement
            guildName={props.guildName}
            players={props.players}
            self={self}
            maxSize={props.maxSize}
            message={props.message}
            discord={props.discord}
            bonuses={props.bonuses}
        />
        <GuildApplications self={self} applications={props.applications} />
        <Treasury
            gold={props.gold}
            mana={props.mana}
            items={props.items}
            gp={props.gp}
            self={self}
            members={props.players}
        />
        <InstanceMenu />
    </div>;
}

function mapStateToProps(state: RootState): StateProps {
    return {
        guildName: state.guild.name,
        players: state.guild.players,
        playerId: playerId(),
        guildId: state.player.guild,
        maxSize: state.guild.max_size,
        message: state.guild.message,
        discord: state.guild.discord,
        bonuses: state.guild.bonus,
        applications: state.guild.applications,
        mana: state.guild.mana,
        gold: state.guild.gold,
        items: state.guild.items,
        gp: state.guild.gp
    };
}

export const GuildHall = connect(mapStateToProps)(GuildHallUnmapped);