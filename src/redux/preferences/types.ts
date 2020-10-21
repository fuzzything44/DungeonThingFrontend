export interface PreferenceState {
    lastTutorial: string;
};

export const SET_LAST_TUTORIAL = "SET_LAST_TUTORIAL";
export interface SetLastTutorialAction {
    type: typeof SET_LAST_TUTORIAL;
    id: string;
}

export type PreferenceAction = SetLastTutorialAction;