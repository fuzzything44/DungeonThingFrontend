import { PlayerState, PlayerAction, SET_PLAYER_INFO, SET_MANA, SET_MANA_RATE, SET_ATTRIBUTE_LEVEL, SET_SKILLS, SET_USED_SKILLS } from "./types";

const initialState: PlayerState = {
    hp: 0,
    attack: 0,
    crit_rate: 0,
    crit_dmg: 0,
    name: "",
    dungeon: 0,
    floor: 0,
    max_floor: 0,
    tickets: 0,
    mana: 0,
    manaPerMin: 0,
    attributes: {
        crit_dmg: 0,
        crit_rate: 0,
        attack_dmg: 0,
        skill_slots: 0
    },
    gold: 0,
    skill_slots: 0,
    skills: [],
    usedSkills: []
};

export function playerReducer(state = initialState, action: PlayerAction): PlayerState {
    switch (action.type) {
        case SET_PLAYER_INFO:
            return {
                ...state,
                ...action
            }
        case SET_MANA:
            return {
                ...state,
                mana: action.mana
            }
        case SET_MANA_RATE:
            return {
                ...state,
                manaPerMin: action.rate
            }
        case SET_ATTRIBUTE_LEVEL:
            return {
                ...state,
                attributes: {
                    ...state.attributes,
                    [action.attribute]: action.level
                }
            }
        case SET_SKILLS:
            return {
                ...state,
                skills: action.skills
            }
        case SET_USED_SKILLS:
            return {
                ...state,
                usedSkills: action.skills
            }
        default:
            ((x: never) => null)(action); // Type checking, ensure all cases covered
            return state; // Still needed as this WILL be called with other types
    }
}