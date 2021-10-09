import { createStore, combineReducers } from "redux";
import { combatReducer } from "./combat/reducers";
import { playerReducer } from "./player/reducers";
import { inventoryReducer } from "./inventory/reducers";
import { preferenceReducer } from "./preferences/reducers";
import { questReducer } from "./quests/reducers";
import { guildReducer } from "./guild/reducers";

const rootReducer = combineReducers({
    combat: combatReducer,
    player: playerReducer,
    inventory: inventoryReducer,
    preferences: preferenceReducer,
    quests: questReducer,
    guild: guildReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer);