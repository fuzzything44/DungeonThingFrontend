import { SetQuestDaysAction, SET_QUEST_DAYS, SetQuestsAction, SET_QUESTS } from "./types";
import { QuestInfo } from "../../api/ApiObjects";


export function setQuestDays(days: number): SetQuestDaysAction {
    return { type: SET_QUEST_DAYS, days: days };
}

export function setQuests(quests: QuestInfo[]): SetQuestsAction {
    return { type: SET_QUESTS, quests: quests };
}