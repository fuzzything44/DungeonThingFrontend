import * as React from 'react';
import { InstanceMenu } from '../InstanceMenu';
import { ScrollingBackground } from './ScrollingBackground';
import { BossLog } from '../api/ApiObjects';
import { connect } from 'react-redux';
import { RootState, store } from '../redux/store';
import { CombatState } from '../redux/combat/types';
import { startCombat, setCombatAction, endCombat, setDamage } from '../redux/combat/actions';
import { EnemyDisplay, ENTER_TIME, DEATH_TIME } from './EnemyDisplay';
import { PlayerDisplay } from './PlayerDisplay';

const DEFAULT_ACTION_TIME = 2.4;

interface StateProps {
    combatState: CombatState;
};
interface DispatchProps { dispatch: any };

type CombatPageProps = StateProps & DispatchProps;

let combatFuncsSetup: boolean = false;

const splitLog = (log: BossLog[]): { playerLog: BossLog[], enemyLog: BossLog[] } => {
    return { playerLog: log.filter(v => !v.toPlayer), enemyLog: log.filter(v => v.toPlayer) };
};

const generateMockCombat = (): BossLog[] => {
    return [
        {
            time: 1.2,
            damageDealt: 5,
            toPlayer: false,
            bossHp: 10,
            remainingHp: 25,
            details: {}
        },
        {
            time: 2.4,
            damageDealt: 6,
            toPlayer: true,
            bossHp: 10,
            remainingHp: 19,
            details: {}
        },
        {
            time: 3.6,
            damageDealt: 6,
            toPlayer: false,
            bossHp: 4,
            remainingHp: 19,
            details: {}
        },
        {
            time: 4.8,
            damageDealt: 4,
            toPlayer: true,
            bossHp: 4,
            remainingHp: 15,
            details: {}
        },
        {
            time: 6,
            damageDealt: 4,
            toPlayer: false,
            bossHp: 0,
            remainingHp: 15,
            details: {}
        }
    ];
}

const createActorTimeouts = (log: BossLog[], isPlayer: boolean) => {
    const firstActionStart = isPlayer ? -log[0].time : 0;

    for (let i = 0; i < log.length; i++) {
        // The animation starts at a constant % between last action and this action,
        // and ends at the same % between this action and next action.
        // If there is no last action, treat it as -(this time)
        // If there is no next action, treat it as (this time + (this time - last time))
        const lastActionTime: number = i === 0 ? firstActionStart : log[i - 1].time;
        const nextActionTime: number = i === log.length - 1 ? log[i].time * 2 - lastActionTime : log[i + 1].time;
        const startAnimation: number = lastActionTime + (log[i].time - lastActionTime) * ANIMATION_OFFSET;
        const endAnimation: number = log[i].time + (nextActionTime - log[i].time) * ANIMATION_OFFSET

        // Create timeout for animation
        setTimeout(() => {
            store.dispatch(setCombatAction({
                time: endAnimation - startAnimation,
                startTime: Date.now(),
                type: "ATTACK"
            }, isPlayer ? "PLAYER" : "ENEMY"));
        }, ENEMY_ENTRY_TIME + startAnimation * 1000);
        // Create timeout to clear animation
        setTimeout(() => {
            store.dispatch(setCombatAction({
                time: DEFAULT_ACTION_TIME,
                startTime: Date.now(),
                type: "NONE"
            }, isPlayer ? "PLAYER" : "ENEMY"));
        }, ENEMY_ENTRY_TIME + endAnimation * 1000);

        // Create timeout for damage
        setTimeout(() => {
            store.dispatch(setDamage(log[i].damageDealt, isPlayer ? "ENEMY" : "PLAYER"));
        }, ENEMY_ENTRY_TIME + log[i].time * 1000);
    }
}
// How much earlier do we show animations than damage? 
const ANIMATION_OFFSET = 0.5;
const ENEMY_ENTRY_TIME = ENTER_TIME * 1000;
const setupCombat = () => {
    const combatLog = generateMockCombat();
    const { playerLog, enemyLog } = splitLog(combatLog);

    // Start the combat
    store.dispatch(startCombat(25, 15, false));

    // Add timeouts for animations and damage
    createActorTimeouts(playerLog, true);
    createActorTimeouts(enemyLog, false);

    setTimeout(() => {
        if (store.getState().combat.actions.enemy.type === "ENTERING") {
            store.dispatch(setCombatAction({
                time: enemyLog[0].time - ENTER_TIME, 
                startTime: Date.now(),
                type: "NONE"
            }, "ENEMY"));
        }
    }, ENEMY_ENTRY_TIME);

    // TODO: handle end of combat better. Current issues:
    // - clips end of victor animation
    // - damage floats up again.
    // Can maybe fix second (most important) in the individual actor callbacks? Halfway between now + next set dmg to 0
    setTimeout(() => {
        const lastLog = combatLog[combatLog.length - 1];
        let playerDead: boolean = lastLog.remainingHp <= 0 || lastLog.bossHp > 0;
        store.dispatch(setCombatAction({
            time: DEATH_TIME,
            startTime: Date.now(),
            type: "DYING"
        }, playerDead ? "PLAYER" : "ENEMY"));
    }, combatLog[combatLog.length - 1].time * 1000 + ENEMY_ENTRY_TIME);

    setTimeout(() => {
        store.dispatch(endCombat());
        setupCombat();
    }, combatLog[combatLog.length - 1].time * 1000 + ENEMY_ENTRY_TIME + 1000 * DEATH_TIME);

};

const CombatPageUnmapped: React.FC<CombatPageProps> = (props) => {
    if (!combatFuncsSetup) {
        combatFuncsSetup = true;
        setupCombat();
    }
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
        <ScrollingBackground paused={!scrollBackground} image={`url(${require("../images/tavern_repeat.png")})`} />
        <InstanceMenu />
        <PlayerDisplay
            walking={scrollBackground}
            hp={props.combatState.playerHp}
            damage={props.combatState.playerDamage}
            action={props.combatState.actions.player}
        />
        {enemy}
        
    </div>;

}

CombatPageUnmapped.displayName = "CombatPage";

const mapStateToProps = (state: RootState): StateProps => {
    return { combatState: state.combat };
}

let CombatPage = connect(mapStateToProps)(CombatPageUnmapped);
export { CombatPage };
