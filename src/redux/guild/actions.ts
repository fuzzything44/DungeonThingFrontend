import { SetGuildInfoAction, SET_GUILD_INFO, SetGuildMessageAction, SET_GUILD_MESSAGE, SetGuildDiscordAction, SET_GUILD_DISCORD, RemoveGuildApplicationAction, REMOVE_GUILD_APPLICATION, RemoveGuildMemberAction, REMOVE_GUILD_MEMBER, SetGuildItemAmountAction, SET_GUILD_ITEM_AMOUNT } from "./types";
import { GuildInfoResponse, ItemInfo } from "../../api/ApiObjects";

export function setGuildInfo(info: Partial<GuildInfoResponse>): SetGuildInfoAction {
    return { type: SET_GUILD_INFO, info: info };
}

export function setGuildMessage(message: string): SetGuildMessageAction {
    return { type: SET_GUILD_MESSAGE, message: message };
}

export function setGuildDiscord(discord: string): SetGuildDiscordAction {
    return { type: SET_GUILD_DISCORD, discord: discord };
}

export function removeGuildApplication(id: number): RemoveGuildApplicationAction {
    return { type: REMOVE_GUILD_APPLICATION, id: id };
}

export function removeGuildMember(id: number): RemoveGuildMemberAction {
    return { type: REMOVE_GUILD_MEMBER, id: id };
}

export function setGuildItemAmount(item: ItemInfo, amount: number): SetGuildItemAmountAction {
    return { type: SET_GUILD_ITEM_AMOUNT, info: item, amount: amount };
}