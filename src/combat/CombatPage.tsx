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
import { setChallengeBoss, setAutoChallenge } from '../redux/combat/actions';
import { getLocationInfo } from './locationInfo';
import { isLoggedIn } from '../api/makeCall';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../pages';

interface StateProps {
    playerState: PlayerState;
    combatState: CombatState;
};
interface DispatchProps { dispatch: any };

type CombatPageProps = StateProps & DispatchProps;

const CombatPageUnmapped: React.FC<CombatPageProps> = (props) => {
    const locationInfo = getLocationInfo(props.playerState.dungeon, props.playerState.floor);
    const scrollBackground = props.combatState.enemyType === "NONE" || props.combatState.actions.enemy.type === "ENTERING";

    if (!isLoggedIn()) {
        return <Redirect to={PAGES.LOGIN} />;
    }

    let enemy: JSX.Element | null;
    if (props.combatState.enemyType === "NONE") {
        enemy = null;
    } else {
        enemy = <EnemyDisplay
            type={props.combatState.enemyType}
            hp={props.combatState.enemyHp}
            damage={props.combatState.enemyDamage}
            action={props.combatState.actions.enemy}
            images={locationInfo.enemyImages}
        />;
    }

    return <div>
        <div aria-hidden="true">
            <ScrollingBackground paused={!scrollBackground} image={`url(${locationInfo.backgroundImage})`} />
            <PlayerDisplay
                walking={scrollBackground}
                hp={props.combatState.playerHp}
                damage={props.combatState.playerDamage}
                action={props.combatState.actions.player}
            />
            {enemy}
        </div>
        <InstanceMenu />
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
                enemyName={props.combatState.lastType === "REGULAR" ? locationInfo.enemyName : locationInfo.bossName}
                enemyStartHp={props.combatState.enemyHp.max}
            />
        </div>
        <button
            style={{
                ...border,
                backgroundColor: props.combatState.challengeBossNext ? "darkgray" : backgroundSecondary.backgroundColor,
                borderRadius: "0.5em",
                padding: "1em",
                position: "absolute",
                top: "20%",
                left: "calc(50% - 3.5em)",
                width: "7em",
                height: "1em"
            }}
            disabled={props.combatState.challengeBossNext}
            onClick={() => props.dispatch(setChallengeBoss())}
        >
            {props.combatState.challengeBossNext ? "Challenging..." : "Challenge Boss"}
        </button>
        {props.playerState.max_floor >= 10 && props.playerState.max_floor > props.playerState.floor ? <button
            style={{
                ...border,
                backgroundColor: props.combatState.autoChallengeEnabled ? "darkgray" : backgroundSecondary.backgroundColor,
                borderRadius: "0.5em",
                padding: "1em",
                position: "absolute",
                top: "calc(20% + 3.5em)",
                left: "calc(50% - 5em)",
                width: "10em",
                textAlign: "center"
            }}
            disabled={props.combatState.challengeBossNext}
            onClick={() => props.dispatch(setAutoChallenge())}
        >
            {props.combatState.autoChallengeEnabled ? "Auto-challenging..." : "Auto-Challenge"}
        </button> : null}
        <div style={{
            borderBottom: border.border,
            borderRight: border.border,
            borderBottomRightRadius: "0.7em",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "0.5em",
            position: "fixed",
            top: "0",
            left: "0"
        }}>
            {locationInfo.dungeonName}<br />
            Floor {props.playerState.floor}
        </div>
    </div>;
}

CombatPageUnmapped.displayName = "CombatPage";

const mapStateToProps = (state: RootState): StateProps => {
    return { playerState: state.player, combatState: state.combat };
}

let CombatPage = connect(mapStateToProps)(CombatPageUnmapped);
export { CombatPage };