import { PreferenceState, PreferenceAction, SET_LAST_TUTORIAL, SET_HP_DISPLAY } from "./types";

const initialState: PreferenceState = {
    lastTutorial: localStorage["tutorial"] ? localStorage["tutorial"] : "",
    hpDisplay: localStorage["display"] ? localStorage["display"] : "VAL"
};

export function preferenceReducer(state = initialState, action: PreferenceAction): PreferenceState {
    switch (action.type) {
        case SET_LAST_TUTORIAL:
            localStorage["tutorial"] = action.id;
            return {
                ...state,
                lastTutorial: action.id
            }
        case SET_HP_DISPLAY:
            localStorage["display"] = action.display;
            return {
                ...state,
                hpDisplay: action.display
            }
        default:
            ((_: never) => null)(action);
            return state;
    }
}