import { createStore, combineReducers } from "redux";
import { combatReducer } from "./combat/reducers";
import { playerReducer } from "./player/reducers";
import { inventoryReducer } from "./inventory/reducers";
import { preferenceReducer } from "./preferences/reducers";

const rootReducer = combineReducers({
    combat: combatReducer,
    player: playerReducer,
    inventory: inventoryReducer,
    preferences: preferenceReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export let store = createStore(rootReducer);