import * as React from 'react';
import { Quest } from './Quest';
import { QuestInfo } from '../../../api/ApiObjects';

interface GuildQuestsProps {
    quests: QuestInfo[];
}

const GuildQuests: React.FC<GuildQuestsProps> = (props) => {
    return <div style={{ minWidth: "20em" }}>
        <h2 style={{ width: "100%", textAlign: "center"}}>
            Guild Quests - Refresh on the 1st
        </h2>
        <ul style={{ listStyleType: "none" }}>
            {props.quests.map(quest => <li key={quest.num}><Quest {...quest} /></li>)}
        </ul>
    </div>
}

GuildQuests.displayName = "GuildQuests";

export { GuildQuests }