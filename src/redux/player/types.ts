import { StatusResponse } from "../../api/ApiObjects";

export type PlayerState = StatusResponse;


export const SET_PLAYER_INFO = "SET_PLAYER_INFO";
export type SetPlayerInfoAction = StatusResponse & {
    type: typeof SET_PLAYER_INFO;
}

export type PlayerAction = SetPlayerInfoAction;