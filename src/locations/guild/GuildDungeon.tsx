import * as React from 'react';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { DungeonEntrance } from '../DungeonEntrance';
import { DUNGEONS } from '../../combat/locationInfo';

interface StateProps {
    dungeonId: number;
    tickets: number;
}

interface PassedProps {
};

type TreasuryProps = StateProps & PassedProps;

const GuildDungeonUnmapped: React.FC<TreasuryProps> = (props) => {
    return <div
        style={{
            position: "absolute",
            left: "1.7em", // These 3 perfectly align it with the background doors
            top: "30.6vh",
            height: "34.8vh",
            width: "10em"
        }}
    >
        <DungeonEntrance
            playerDungeon={props.dungeonId}
            tickets={props.tickets}
            thisDungeon={DUNGEONS.CONSTRUCTION_ITEMS}
        >
            <img
                style={{ height: "100%", width: "100%" }}
                src={require("../../images/guild/guild_dungeon.png")}
                alt="To Scrapyard"
                title="To Scrapyard"
            />
        </DungeonEntrance>
    </div>;
}

function mapStateToProps(state: RootState): StateProps {
    return {
        dungeonId: state.player.dungeon,
        tickets: state.player.tickets
    }
}

export const GuildDungeon = connect(mapStateToProps)(GuildDungeonUnmapped);