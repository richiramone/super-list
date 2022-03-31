import { Dispatch } from "redux";
import {
  ITEMS_REQUESTED,
  ITEMS_REFRESHED,
  ITEM_ADDED,
  ITEM_UPDATED,
  ItemsDispatchTypes,
  ITEM_CONFIRMED,
  ITEM_DELETED,
  LIST_EMPTIED,
} from "./ItemsActionTypes";
import { IItem } from "../config/interfaces";
import { author } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { listApiController } from "../controllers/listApiController";
import { RootStore } from "../Store";

const dispatch = useDispatch();
const itemsState = useSelector((state: RootStore) => state.items);

export const refreshList = async () => {
  dispatch({
    type: ITEMS_REQUESTED,
  });

  const items = await listApiController.getItems();

  dispatch({
    type: ITEMS_REFRESHED,
    payload: items,
  });
};

export const getItems =
  () => async (dispatch: Dispatch<ItemsDispatchTypes>) => {
    const items = await listApiController.getItems();

    dispatch({
      type: ITEMS_REFRESHED,
      payload: items,
    });
  };

export const addItem = async (item: string) => {
  const newItem: IItem = {
    hasQuestionMark: item.includes("?"),
    author: author,
    value: item,
  };

  dispatch({
    type: ITEM_ADDED,
    items: { newItem, ...itemsState.items },
  });

  await listApiController.addItem(newItem).then(() => {
    getItems();
  });
};

export const updateItem = async (itemKey: string, updateItemValue: string) => {
  const tempItems = { ...itemsState.items };

  Object.keys(tempItems).map((key: string) => {
    if (itemKey === key) {
      tempItems[key].value = updateItemValue;
      tempItems[key].hasQuestionMark = updateItemValue.includes("?");
    }

    return tempItems[key];
  });

  dispatch({
    type: ITEM_UPDATED,
    items: tempItems,
  });

  await listApiController.updateItem(itemKey, tempItems[itemKey]).then(() => {
    getItems();
  });
};

export const confirmItem = async (itemKey: string) => {
  const tempItems = { ...itemsState.items };

  Object.keys(tempItems).map((key: string) => {
    if (itemKey === key) {
      tempItems[key].value = tempItems[key].value.replace("?", "");
      tempItems[key].hasQuestionMark = false;
    }

    return tempItems[key];
  });

  dispatch({
    type: ITEM_CONFIRMED,
    items: tempItems,
  });

  await listApiController.updateItem(itemKey, tempItems[itemKey]).then(() => {
    getItems();
  });
};

export const deleteItem = async (itemKey: string) => {
  const tempItems = { ...itemsState.items };
  delete tempItems[itemKey];

  dispatch({
    type: ITEM_DELETED,
    items: tempItems,
  });

  await listApiController.deleteItem(itemKey).then(() => {
    getItems();
  });
};

export const emptyList = async () => {
  await listApiController.emptyList();

  dispatch({
    type: LIST_EMPTIED,
  });
};
