import { QuestInfo } from "../../api/ApiObjects";

export type QuestState =  {
    daysToChange: number | "?",
    quests: QuestInfo[]
};

export const SET_QUEST_DAYS = "SET_QUEST_DAYS";
export interface SetQuestDaysAction {
    type: typeof SET_QUEST_DAYS;
    days: number;
}

export const SET_QUESTS = "SET_QUESTS";
export interface SetQuestsAction {
    type: typeof SET_QUESTS;
    quests: QuestInfo[];
}

export type QuestAction = SetQuestDaysAction | SetQuestsAction;