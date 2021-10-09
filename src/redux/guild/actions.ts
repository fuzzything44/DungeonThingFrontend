import { SetGuildInfoAction, SET_GUILD_INFO, SetGuildMessageAction, SET_GUILD_MESSAGE, SetGuildDiscordAction, SET_GUILD_DISCORD } from "./types";
import { GuildInfoResponse } from "../../api/ApiObjects";

export function setGuildInfo(info: GuildInfoResponse): SetGuildInfoAction {
    return { type: SET_GUILD_INFO, info: info };
}

export function setGuildMessage(message: string): SetGuildMessageAction {
    return { type: SET_GUILD_MESSAGE, message: message };
}

export function setGuildDiscord(discord: string): SetGuildDiscordAction {
    return { type: SET_GUILD_DISCORD, discord: discord };
}