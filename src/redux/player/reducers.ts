import { PlayerState, PlayerAction, SET_PLAYER_INFO } from "./types";

const initialState: PlayerState = {
    hp: 0,
    attack: 0,
    crit_rate: 0,
    crit_dmg: 0,
    name: "",
    dungeon: 0,
    floor: 0,
    max_floor: 0,
    tickets: 0
};

export function playerReducer(state = initialState, action: PlayerAction): PlayerState {
    switch (action.type) {
        case SET_PLAYER_INFO:
            return {
                ...state,
                ...action
            }
        default:
            return state;
    }
}