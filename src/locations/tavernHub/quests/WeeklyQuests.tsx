import * as React from 'react';
import { Quest } from './Quest';
import { QuestInfo } from '../../../api/ApiObjects';

interface WeeklyQuestsProps {
    refreshDays: number | "?";
    quests: QuestInfo[];
}

const WeeklyQuests: React.FC<WeeklyQuestsProps> = (props) => {
    return <div style={{ minWidth: "20em" }}>
        <h2 style={{ width: "100%", textAlign: "center"}}>
            Weekly Quests - {props.refreshDays} days until refresh
        </h2>
        <ul style={{ listStyleType: "none" }}>
            {props.quests.map(quest => <li key={quest.num}><Quest {...quest} /></li>)}
        </ul>
    </div>
}

WeeklyQuests.displayName = "WeeklyQuests";

export { WeeklyQuests }