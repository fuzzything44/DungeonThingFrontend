export interface PreferenceState {
    lastTutorial: string;
    hpDisplay: "VAL" | "PERCENT";
};

export const SET_LAST_TUTORIAL = "SET_LAST_TUTORIAL";
export interface SetLastTutorialAction {
    type: typeof SET_LAST_TUTORIAL;
    id: string;
}

export const SET_HP_DISPLAY = "SET_HP_DISPLAY";
export interface SetHpDisplayAction {
    type: typeof SET_HP_DISPLAY;
    display: PreferenceState["hpDisplay"];
}

export type PreferenceAction = SetLastTutorialAction | SetHpDisplayAction;