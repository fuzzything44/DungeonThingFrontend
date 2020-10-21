import { SetLastTutorialAction, SET_LAST_TUTORIAL } from "./types";

export function setLastTutorial(id: string): SetLastTutorialAction {
    return {
        type: SET_LAST_TUTORIAL,
        id: id
    };
}
