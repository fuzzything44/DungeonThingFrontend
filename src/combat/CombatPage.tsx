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

interface StateProps {
    playerState: PlayerState;
    combatState: CombatState;
};
interface DispatchProps { dispatch: any };

type CombatPageProps = StateProps & DispatchProps;

const CombatPageUnmapped: React.FC<CombatPageProps> = (props) => {
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
        />;
    }

    return <div>
        <div aria-hidden="true">
            <ScrollingBackground paused={!scrollBackground} image={`url(${require("../images/tavern_repeat.png")})`} />
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
            <CombatLog log={props.combatState.fullLog} combatStart={props.combatState.combatStart} />
        </div>
    </div>;
}

CombatPageUnmapped.displayName = "CombatPage";

const mapStateToProps = (state: RootState): StateProps => {
    return { playerState: state.player, combatState: state.combat };
}

let CombatPage = connect(mapStateToProps)(CombatPageUnmapped);
export { CombatPage };