import { PreferenceState, PreferenceAction, SET_LAST_TUTORIAL } from "./types";

const initialState: PreferenceState = {
    lastTutorial: localStorage["tutorial"] ? localStorage["tutorial"] : ""
};

export function preferenceReducer(state = initialState, action: PreferenceAction): PreferenceState {
    switch (action.type) {
        case SET_LAST_TUTORIAL:
            return {
                ...state,
                lastTutorial: action.id
            }
        default:
            return state;
    }
}