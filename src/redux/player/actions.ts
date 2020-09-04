import { SetPlayerInfoAction, SET_PLAYER_INFO } from "./types";
import { StatusResponse } from "../../api/ApiObjects";

export function setPlayerInfo(response: StatusResponse): SetPlayerInfoAction {
    return {
        type: SET_PLAYER_INFO,
        ...response
    };
}