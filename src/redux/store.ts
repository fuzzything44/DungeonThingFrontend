import { createStore, combineReducers } from "redux";
import { combatReducer } from "./combat/reducers";

const rootReducer = combineReducers({
    combat: combatReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export let store = createStore(rootReducer);