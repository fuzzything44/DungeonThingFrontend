import * as React from 'react';
import { border, backgroundColor, backgroundSecondary } from '../styles';
import { BossLog, BossReward } from '../api/ApiObjects';
import { ENTER_TIME } from './EnemyDisplay';
import { formatNumber } from '../Util/numberFormat';
import { store } from '../redux/store';
import { getItemInformation } from '../inventory/itemInfo';

interface CombatLogProps {
    log: BossLog[];
    combatStart: number;
    rewards: BossReward[] | undefined;
    enemyName: string;
}

const LOG_OPENING_TIME = 0.75;

const CombatLog: React.FC<CombatLogProps> = (props) => {
    const [expanded, changeExpanded] = React.useState<"OPENED" | "OPENING" | "CLOSING" | "CLOSED">("CLOSED");
    const [timeout, changeTimeout] = React.useState<number | undefined>(undefined);
    const [hasScrolled, changeScrolled] = React.useState(false);

    // Reset if they've scrolled at the start of each combat
    if ((props.log.length === 0 || Date.now() - props.combatStart < props.log[0].time * 1000) && hasScrolled) {
        changeScrolled(false);
    }
    
    return <section
        style={{
            ...border,
            ...backgroundColor,
            borderRadius: "0.5em",
            margin: "1em",
            width: "25em"
        }}
        onClick={() => {
            if (expanded !== "OPENING" && expanded !== "OPENED") {
                changeExpanded("OPENING");
                clearTimeout(timeout);
                changeTimeout(window.setTimeout(() => changeExpanded("OPENED"), LOG_OPENING_TIME * 1000));
            }
        }}
    >
        <div
            style={{
                ...backgroundSecondary,
                borderBottomLeftRadius: expanded === "CLOSED" ? "0.5em" : undefined,
                borderBottomRightRadius: expanded === "CLOSED" ? "0.5em" : undefined,
                borderTopLeftRadius: "0.5em",
                borderTopRightRadius: "0.5em",
                borderBottom: expanded !== "CLOSED" ? border.border : undefined, padding: "0.3em",
                width: "calc(100% - 0.6em)"
            }}
            onClick={(e) => {
                if (expanded === "OPENED" || expanded === "OPENING") {
                    e.stopPropagation();
                    changeExpanded("CLOSING");
                    clearTimeout(timeout);
                    changeTimeout(window.setTimeout(() => changeExpanded("CLOSED"), LOG_OPENING_TIME * 1000));
                }
            }}
        >
            <h1>Combat Log</h1>
            <div style={{ float: "right", paddingRight: "0.1em" }}>
                {expanded === "OPENED" || expanded === "OPENING" ? "\u2193" : "\u2191"}
            </div>
        </div>
        <ol
            style={{
                padding: expanded === "CLOSED" ? undefined : "0.5em",
                height: expanded === "OPENED" || expanded === "OPENING" ? "15em" : "0",
                overflowY: expanded === "OPENED" ? "scroll" : "hidden",
                transition: `height ${LOG_OPENING_TIME}s linear`,
                margin: "0",
                listStyleType: "none"
            }}
            onScroll={(e) => {
                // Resume auto scroll if at bottom
                if (e.currentTarget.scrollTop === e.currentTarget.scrollHeight - e.currentTarget.clientHeight) {
                    changeScrolled(false);
                } else {
                    changeScrolled(true);
                }
            }}
            ref={ol => {
                if (ol && !hasScrolled) {
                    ol.scrollTop = ol.scrollHeight;
                }
            }}
        >
            {Date.now() - props.combatStart < ENTER_TIME * 1000 ? null : <li>
                You're fighting a {props.enemyName} with {formatNumber(store.getState().combat.enemyHp.max)} HP
            </li>}
            {props.log.filter(log => log.time * 1000 <= Date.now() - props.combatStart - ENTER_TIME * 1000).map(log => {
                const startString = log.toPlayer ?
                    `The enemy deals ${formatNumber(log.damageDealt)} damage to you. You have ${formatNumber(Math.max(0, log.remainingHp))} HP left.` :
                    `You deal ${formatNumber(log.damageDealt)} damage to the enemy. It has ${formatNumber(Math.max(0, log.bossHp))} HP left.`;
                const details = log.details && log.details["message"] ? <b>{log.details["message"]}</b> : null;
                return <li key={log.time}>{details} {startString}</li>;
            })}
            {props.rewards === undefined ? null : <li>
                You won the fight! On the enemy's body, you found:
                <ul style={{ listStyleType: "none" }}>
                    {props.rewards.map(reward => {
                        let content: string;
                        switch (reward.reward.type) {
                            case "MANA":
                                content = formatNumber(reward.reward.amount) + " mana";
                                break;
                            case "ITEM":
                                content = formatNumber(reward.reward.info.amount) + "x " + getItemInformation(reward.reward.info.itemId, reward.reward.info.itemData).name;
                                break;
                            case "EQUIP":
                                content = reward.reward.info.name;
                                break;
                            default:
                                return ((_: never): null => null)(reward.reward);
                        }
                        return <li key={JSON.stringify(reward)}>{content}</li>
                    })}
                </ul>
            </li>}
        </ol>
    </section>;
};

CombatLog.displayName = "CombatLog";

export { CombatLog };