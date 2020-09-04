import { createStore, combineReducers } from "redux";
import { combatReducer } from "./combat/reducers";
import { playerReducer } from "./player/reducers";

const rootReducer = combineReducers({
    combat: combatReducer,
    player: playerReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export let store = createStore(rootReducer);