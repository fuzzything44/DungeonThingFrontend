import { ItemInfo, PlayerInfo, GuildBonuses, ApplicationInfo, GuildInfoResponse } from "../../api/ApiObjects";

export type GuildState =  {
    name: string;
    players: PlayerInfo[];
    max_size: number;
    message: string;
    discord: string;
    bonus: GuildBonuses;
    applications: ApplicationInfo[]
    mana: number;
    gold: number;
    gp: number;
    items: ItemInfo[];
};

export const SET_GUILD_INFO = "SET_GUILD_INFO";
export interface SetGuildInfoAction {
    type: typeof SET_GUILD_INFO;
    info: Partial<GuildInfoResponse>;
}

export const SET_GUILD_MESSAGE = "SET_GUILD_MESSAGE";
export interface SetGuildMessageAction {
    type: typeof SET_GUILD_MESSAGE;
    message: string;
}

export const SET_GUILD_DISCORD = "SET_GUILD_DISCORD";
export interface SetGuildDiscordAction {
    type: typeof SET_GUILD_DISCORD;
    discord: string;
}

export const REMOVE_GUILD_APPLICATION = "REMOVE_GUILD_APPLICATION";
export interface RemoveGuildApplicationAction {
    type: typeof REMOVE_GUILD_APPLICATION;
    id: number;
}

export const REMOVE_GUILD_MEMBER = "REMOVE_GUILD_MEMBER";
export interface RemoveGuildMemberAction {
    type: typeof REMOVE_GUILD_MEMBER;
    id: number;
}

export const SET_GUILD_ITEM_AMOUNT = "SET_GUILD_ITEM_AMOUNT";
export interface SetGuildItemAmountAction {
    type: typeof SET_GUILD_ITEM_AMOUNT;
    info: ItemInfo;
    amount: number;
}

export type GuildAction = SetGuildInfoAction
    | SetGuildMessageAction
    | SetGuildDiscordAction
    | RemoveGuildApplicationAction
    | RemoveGuildMemberAction
    | SetGuildItemAmountAction;