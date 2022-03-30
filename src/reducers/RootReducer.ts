import { combineReducers } from "redux";
import ItemsReducer from "./ItemsReducer";

const RootReducer = combineReducers({
  items: ItemsReducer,
});

export default RootReducer;
