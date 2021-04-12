import * as React from 'react';
import { Modal } from '../../../Util/Modal';
import { WeeklyQuests } from './WeeklyQuests';
import { QuestInfo, callGetQuests } from '../../../api/ApiObjects';
import { RootState, store } from '../../../redux/store';
import { connect } from 'react-redux';
import { setQuestDays, setQuests } from '../../../redux/quests/actions';
import { ErrorBox } from '../../../Util/ErrorBox';

interface QuestListProps {
    weeklyRefresh: number | "?";
    allQuests: QuestInfo[];
    gold: number | null;
}

const TOTAL_WEEKLY_QUESTS = 5;

const QuestListUnmapped: React.FC<QuestListProps> = (props) => {
    const [showQuests, changeShowQuests] = React.useState(false);
    const [error, changeError] = React.useState("");

    React.useEffect(() => {
        callGetQuests({}).then(questResponse => {
            changeError("");
            store.dispatch(setQuestDays(questResponse.refreshDays));
            store.dispatch(setQuests(questResponse.quests));
        }).catch(() => changeError("Failed to load quest data"));
    }, []);

    const weeklies = props.allQuests.slice(0, TOTAL_WEEKLY_QUESTS);
    const rest = props.allQuests.slice(TOTAL_WEEKLY_QUESTS, props.allQuests.length);

    return <>
        <button
            onClick={() => changeShowQuests(true)}
            style={{
                position: "absolute",
                left: "5em",
                top: "20vh"
            }}
        >
            <img
                style={{ height: "15em" }}
                src={require("../../../images/list.png")}
                alt="Quests"
                title="Quests"
            />
        </button>
        {showQuests ? <Modal title="Quests" onClose={() => changeShowQuests(false)}>
            {error ? <ErrorBox message={error} /> : null}
            Current gold: {props.gold ? props.gold : "-"} (A shop to spend this will be added here soon)<br/>
            <WeeklyQuests refreshDays={props.weeklyRefresh} quests={weeklies} />
            {rest.length ? <h2>Other Quests - how did you get this? </h2> : null}
        </Modal> : null}
    </>
}

QuestListUnmapped.displayName = "QuestList";

function mapStateToProps(rootState: RootState): QuestListProps {
    return {
        weeklyRefresh: rootState.quests.daysToChange,
        allQuests: rootState.quests.quests,
        gold: rootState.player.gold
    };
}

const QuestList = connect(mapStateToProps)(QuestListUnmapped);

export { WeeklyQuests }

export { QuestList }