import { QuestState, QuestAction, SET_QUEST_DAYS, SET_QUESTS } from "./types";

const initialState: QuestState = {
    daysToChange: "?",
    quests: []
};

export function questReducer(state = initialState, action: QuestAction): QuestState {
    switch (action.type) {
        case SET_QUEST_DAYS:
            return {
                ...state,
                daysToChange: action.days
            }
        case SET_QUESTS:
            return {
                ...state,
                quests: action.quests
            }
        default:
            return state;
    }
}