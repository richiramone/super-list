import { combineReducers } from "redux";
import ItemsReducer from "./ItemsReducer";

const reducers = combineReducers({
  app: ItemsReducer,
});

export default reducers;
