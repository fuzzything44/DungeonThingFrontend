import { SetLastTutorialAction, SET_LAST_TUTORIAL, SetHpDisplayAction, SET_HP_DISPLAY } from "./types";

export function setLastTutorial(id: string): SetLastTutorialAction {
    return {
        type: SET_LAST_TUTORIAL,
        id: id
    };
}

export function setHpDisplay(display: SetHpDisplayAction["display"]): SetHpDisplayAction {
    return {
        type: SET_HP_DISPLAY,
        display: display
    };
}
