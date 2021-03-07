import * as React from 'react';
import { InstanceMenu } from '../../InstanceMenu';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { getLocationInfo } from '../../combat/locationInfo';
import { Barkeeper } from './Barkeeper';
import { Player } from './Player';
import { Inventory } from './Inventory';
import { TavernDoor } from './TavernDoor';
import { isLoggedIn } from '../../api/makeCall';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../../pages';
import { ExitDoor } from './ExitDoor';

interface StateProps {
    dungeonName: string;
    dungeonFloor: number;
    tickets: number;
    dungeonId: number;
};

type TavernHubProps = StateProps;

const TavernHubUnmapped: React.FC<TavernHubProps> = (props) => {
    if (!isLoggedIn()) {
        return <Redirect to={PAGES.LOGIN} />;
    }

    return <div style={{
        height: "100vh",
        width: "max(100vw, 45em)"
    }}>
        {/* Background parts */}
        <div style={{
            float: "left",
            width: "25em",
            height: "100%",
            backgroundImage: `url(${require("../../images/tavern_left.png")})`,
            backgroundSize: "25em 100%",
        }}>
        </div>
        <div style={{
            float: "left",
            width: "calc(100% - 25em)",
            height: "100%",
            backgroundImage: `url(${require("../../images/tavern_inside_repeat.png")})`,
            backgroundSize: "25em 100%",
            backgroundRepeat: "repeat-x"
        }}>
        </div>
        <Player />
        <Inventory />
        <TavernDoor {...props} />
        <ExitDoor />
        <Barkeeper {...props} />
        
        <InstanceMenu />
    </div>;
}

TavernHubUnmapped.displayName = "TavernHub";


const mapStateToProps = (state: RootState): StateProps => {
    return {
        dungeonName: getLocationInfo(state.player.dungeon, state.player.floor).dungeonName,
        dungeonFloor: state.player.floor,
        tickets: state.player.tickets,
        dungeonId: state.player.dungeon
    };
}

let TavernHub = connect(mapStateToProps)(TavernHubUnmapped);

export { TavernHub };