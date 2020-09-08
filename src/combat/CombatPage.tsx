import * as React from 'react';
import { InstanceMenu } from '../InstanceMenu';
import { ScrollingBackground } from './ScrollingBackground';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { CombatState } from '../redux/combat/types';
import { EnemyDisplay } from './EnemyDisplay';
import { PlayerDisplay } from './PlayerDisplay';
import { CombatLog } from './CombatLog';
import { PlayerState } from '../redux/player/types';
import { border, backgroundSecondary } from '../styles';
import { setChallengeBoss } from '../redux/combat/actions';
import { getLocationInfo } from './locationInfo';

interface StateProps {
    playerState: PlayerState;
    combatState: CombatState;
};
interface DispatchProps { dispatch: any };

type CombatPageProps = StateProps & DispatchProps;

const CombatPageUnmapped: React.FC<CombatPageProps> = (props) => {
    const locationInfo = getLocationInfo(props.playerState.dungeon, props.playerState.floor);
    const scrollBackground = props.combatState.enemyType === "NONE" || props.combatState.actions.enemy.type === "ENTERING";

    let enemy: JSX.Element | null;
    if (props.combatState.enemyType === "NONE") {
        enemy = null;
    } else {
        enemy = <EnemyDisplay
            type={props.combatState.enemyType}
            hp={props.combatState.enemyHp}
            damage={props.combatState.enemyDamage}
            action={props.combatState.actions.enemy}
            image={props.combatState.enemyType === "REGULAR" ? locationInfo.enemyImage : locationInfo.bossImage}
        />;
    }

    return <div>
        <div aria-hidden="true">
            <ScrollingBackground paused={!scrollBackground} image={`url(${locationInfo.backgroundImage})`} />
            <InstanceMenu />
            <PlayerDisplay
                walking={scrollBackground}
                hp={props.combatState.playerHp}
                damage={props.combatState.playerDamage}
                action={props.combatState.actions.player}
            />
            {enemy}
        </div>
        <div
            style={{
                position: "absolute",
                bottom: "0"
            }}
        >
            <CombatLog
                log={props.combatState.fullLog}
                combatStart={props.combatState.combatStart}
                rewards={props.combatState.rewards}
                enemyName={props.combatState.lastType === "REGULAR" ? locationInfo.enemyName : locationInfo.bossName }
            />
        </div>
        <button
            style={{
                ...backgroundSecondary,
                ...border,
                borderRadius: "0.5em",
                padding: "1em",
                position: "absolute",
                top: "20%",
                left: "calc(50% - 3.5em)",
                width: "7em",
            }}
            disabled={props.combatState.challengeBossNext}
            onClick={() => props.dispatch(setChallengeBoss())}
        >
            {props.combatState.challengeBossNext ? "Challenging..." : "Challenge Boss"}
        </button>
    </div>;
}

CombatPageUnmapped.displayName = "CombatPage";

const mapStateToProps = (state: RootState): StateProps => {
    return { playerState: state.player, combatState: state.combat };
}

let CombatPage = connect(mapStateToProps)(CombatPageUnmapped);
export { CombatPage };