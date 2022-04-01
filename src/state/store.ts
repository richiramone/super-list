import { createStore, applyMiddleware } from "redux";
import RootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

let middlewares;

if (process.env.NODE_ENV === "development") {
  const logger = createLogger();
  middlewares = [thunk, logger];
} else {
  middlewares = [thunk];
}

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootStore = ReturnType<typeof RootReducer>;

export default Store;
