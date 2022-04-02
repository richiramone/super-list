import { Dispatch } from "redux";
import {
  ITEMS_RECEIVED,
  ITEM_ADDED,
  ITEM_UPDATED,
  ITEM_CONFIRMED,
  ITEM_DELETED,
  LIST_EMPTIED,
  ItemsDispatchTypes,
  IItem,
} from "../../interfaces";
import { author, updateLocalStorage } from "../../utils";
import { listApiController } from "../../controllers/listApiController";
import { RootStore } from "../store";

const _refreshList = async () => {
  const items = await listApiController.getItems();

  updateLocalStorage(items);

  return items;
};

export const refreshList = () => async () => {
  return {
    type: ITEMS_RECEIVED,
    payload: await _refreshList(),
  };
};

export const addItem = (item: string) => async () => {
  const newItem: IItem = {
    author: author,
    hasQuestionMark: item.includes("?"),
    value: item,
  };

  await listApiController.addItem(newItem);

  return {
    type: ITEM_ADDED,
    payload: await _refreshList(),
  };
};

export const updateItem =
  (itemKey: string, updateItemValue: string) =>
  async (
    _dispatch: Dispatch<ItemsDispatchTypes>,
    getState: () => RootStore
  ) => {
    const items = getState().app.items;
    const tempItems = { ...items };

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = updateItemValue;
        tempItems[key].hasQuestionMark = updateItemValue.includes("?");
      }

      return tempItems[key];
    });

    await listApiController.updateItem(itemKey, tempItems[itemKey]);

    return {
      type: ITEM_UPDATED,
      payload: await _refreshList(),
    };
  };

export const confirmItem =
  (itemKey: string) =>
  async (
    _dispatch: Dispatch<ItemsDispatchTypes>,
    getState: () => RootStore
  ) => {
    const items = getState().app.items;
    const tempItems = { ...items };

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = tempItems[key].value.replace("?", "");
        tempItems[key].hasQuestionMark = false;
      }

      return tempItems[key];
    });

    await listApiController.updateItem(itemKey, tempItems[itemKey]);

    return {
      type: ITEM_CONFIRMED,
      payload: await _refreshList(),
    };
  };

export const deleteItem = (itemKey: string) => async () => {
  await listApiController.deleteItem(itemKey);
  await _refreshList();

  return {
    type: ITEM_DELETED,
    payload: await _refreshList(),
  };
};

export const emptyList = () => {
  updateLocalStorage({});

  listApiController.emptyList();

  return { type: LIST_EMPTIED };
};
