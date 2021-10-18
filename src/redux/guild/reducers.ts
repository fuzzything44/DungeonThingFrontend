import { GuildState, GuildAction, SET_GUILD_INFO, SET_GUILD_MESSAGE, SET_GUILD_DISCORD, REMOVE_GUILD_APPLICATION, REMOVE_GUILD_MEMBER, SET_GUILD_ITEM_AMOUNT } from "./types";
import { ItemInfo } from "../../api/ApiObjects";
import { itemSorting } from "../inventory/reducers";

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
        case REMOVE_GUILD_APPLICATION:
            return {
                ...state,
                applications: state.applications.filter(app => app.id !== action.id)
            }
        case REMOVE_GUILD_MEMBER:
            return {
                ...state,
                players: state.players.filter(p => p.id !== action.id)
            }
        case SET_GUILD_ITEM_AMOUNT:
            const sameItem = (item: ItemInfo) => item.itemData === action.info.itemData &&
                item.itemId === action.info.itemId;
            // If item doesn't exist, add new item. Otherwise, change amount
            const newItems = state.items.findIndex(sameItem) === -1 ?
                [...state.items, { ...action.info, amount: action.amount }].sort(itemSorting) :
                state.items.map(item => sameItem(item) ? { ...action.info, amount: action.amount } : item);
            return {
                ...state,
                items: newItems.filter(item => item.amount !== 0)
            }
        default:
            return ((_: never) => state)(action);
    }
}