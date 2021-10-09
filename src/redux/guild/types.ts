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
    info: GuildInfoResponse;
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

export type GuildAction = SetGuildInfoAction | SetGuildMessageAction | SetGuildDiscordAction;