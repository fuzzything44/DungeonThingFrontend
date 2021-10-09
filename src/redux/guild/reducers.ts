import { GuildState, GuildAction, SET_GUILD_INFO, SET_GUILD_MESSAGE, SET_GUILD_DISCORD } from "./types";

const initialState: GuildState = {
    name: "Loading...",
    players: [],
    max_size: 10,
    message: "Loading...",
    discord: "E8vZ5VS",
    bonus: {
        members: 0,
        crit_rate: 0,
        crit_dmg: 0,
        dmg: 0,
        skill_slots: 0,
        cost_reduce: 0
    },
    applications: [],
    mana: 0,
    gold: 0,
    items: [],
    gp: 0
};

export function guildReducer(state = initialState, action: GuildAction): GuildState {
    switch (action.type) {
        case SET_GUILD_INFO:
            return {
                ...state,
                ...action.info
            }
        case SET_GUILD_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case SET_GUILD_DISCORD:
            return {
                ...state,
                discord: action.discord
            }
        default:
            return ((_: never) => state)(action);
    }
}