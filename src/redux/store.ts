import { createStore, combineReducers } from "redux";
import { combatReducer } from "./combat/reducers";
import { playerReducer } from "./player/reducers";
import { inventoryReducer } from "./inventory/reducers";

const rootReducer = combineReducers({
    combat: combatReducer,
    player: playerReducer,
    inventory: inventoryReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export let store = createStore(rootReducer);