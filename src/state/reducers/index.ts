import { combineReducers } from "redux";
import ItemsReducer from "./ItemsReducer";

const reducers = combineReducers({
  items: ItemsReducer,
});

export default reducers;
