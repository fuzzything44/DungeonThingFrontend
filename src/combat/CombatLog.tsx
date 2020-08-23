import * as React from 'react';
import { border, backgroundColor, backgroundSecondary } from '../styles';
import { BossLog } from '../api/ApiObjects';

interface CombatLogProps {
    log: BossLog[];
    combatStart: number;
}

const LOG_OPENING_TIME = 0.75;

const CombatLog: React.FC<CombatLogProps> = (props) => {
    const [expanded, changeExpanded] = React.useState<"OPENED" | "OPENING" | "CLOSING" | "CLOSED">("CLOSED");
    const [timeout, changeTimeout] = React.useState<number | undefined>(undefined);

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
        <h1
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
            Combat Log
        </h1>
        <ol
            style={{
                padding: expanded === "CLOSED" ? undefined : "0.5em",
                height: expanded === "OPENED" || expanded === "OPENING" ? "15em" : "0",
                overflow: expanded === "OPENED" ? undefined : "hidden",
                transition: `height ${LOG_OPENING_TIME}s linear`,
                margin: "0",
                listStyleType: "none"
            }}
        >
            {props.log.filter(log => log.time * 1000 <= Date.now() - props.combatStart).map(log => {
                const startString = log.toPlayer ?
                    `The enemy deals ${log.damageDealt} damage to you. You have ${log.remainingHp} HP left.` :
                    `You deal ${log.damageDealt} damage to the enemy. It has ${log.remainingHp} HP left.`;
                return <li><b>{log.details["message"]} </b>{startString}</li>;
            })}
        </ol>
    </section>;
};

CombatLog.displayName = "CombatLog";

export { CombatLog };