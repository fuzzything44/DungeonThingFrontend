import * as React from 'react';
import { buttonStyle, backgroundSecondary, BORDER_COLOR } from '../../../styles';
import { callClaimQuest, callGetQuests, callStatus } from '../../../api/ApiObjects';
import { store } from '../../../redux/store';
import { setQuests } from '../../../redux/quests/actions';
import { setPlayerInfo } from '../../../redux/player/actions';

interface QuestProps {
    name: string;
    desc: string;
    complete: boolean;
    claimed: boolean;
    num: number;
}

const Quest: React.FC<QuestProps> = (props) => {
    const [expanded, toggleExpand] = React.useReducer(e => !e, false);

    return <div style={{ marginBottom: "0.7em" }}>
        <button onClick={toggleExpand}>
            <svg viewBox="0 0 100 100" style={{ width: "1em", height: "1em", marginRight: "0.5em" }}>
                <title>Quest {props.complete ? "complete!" : "incomplete"}</title>
                <rect rx="25%" x={0} y={0} width="100%" height="100%" fill={BORDER_COLOR} />
                <rect rx="20%" x={7} y={7} width="86%" height="86%" fill={backgroundSecondary.backgroundColor} />
                {props.complete ? <>
                    <line x1={0} y1={40} x2={40} y2={80} stroke="red" strokeWidth={10} />
                    <line x1={40} y1={80} x2={100} y2={10} stroke="red" strokeWidth={10} />
                </> : null}
            </svg>
            {props.name}
        </button>
        {props.complete && !props.claimed ?
            <button
                onClick={async () => {
                    callClaimQuest({ num: props.num });
                    const [questResponse, statusResponse] = await Promise.all([callGetQuests({}), callStatus({})]);
                    store.dispatch(setQuests(questResponse.quests));
                    store.dispatch(setPlayerInfo(statusResponse));
                }}
                style={{ ...buttonStyle, marginLeft: "0.5em" }}
            >
                Claim Rewards
            </button>
        : null}
        {expanded ? <div style={{ marginLeft: "1em" }}>{props.desc}</div> : null}
    </div>
}

Quest.displayName = "Quest";

export { Quest }