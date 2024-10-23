import { combineReducers } from "redux";

import gameReducer from "./game/slice";

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
