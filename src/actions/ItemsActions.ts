import { Dispatch } from "redux";
import { IItems } from "../config/interfaces";
import { SuperListApiControlller as SuperListApiController } from "../controllers/superListApiController";
import { ITEMS_REQUESTED, ItemsDispatchTypes } from "./ItemsActionTypes";

export const getItems = () => async (
  dispatch: Dispatch<ItemsDispatchTypes>
) => {
  dispatch({
    type: ITEMS_REQUESTED
  });

  await SuperListApiController.getItems().then(items => {
    // setItems(reverseItems(items));
    // setIsPreloaderActive(false);
  });
};

const reverseItems = (items: IItems) => {
  return Object.keys(items)
    .reverse()
    .reduce((a: IItems, key) => {
      a[key] = items[key];
      return a;
    }, {});
};
