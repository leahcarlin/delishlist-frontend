import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import list from "./list/reducer";

export default combineReducers({
  appState,
  user,
  list,
});
