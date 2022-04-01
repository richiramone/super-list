import { Dispatch } from "redux";
import {
  ITEMS_REFRESHED,
  ITEM_ADDED,
  ITEM_UPDATED,
  ITEM_CONFIRMED,
  ITEM_DELETED,
  LIST_EMPTIED,
  ItemsDispatchTypes,
  IItem,
} from "../../interfaces";
import { author } from "../../utils";
import { listApiController } from "../../controllers/listApiController";

export const refreshList = () => (dispatch: Dispatch<ItemsDispatchTypes>) => {
  listApiController.getItems().then((items) => {
    dispatch({
      type: ITEMS_REFRESHED,
      payload: items,
    });
  });
};

export const addItem = (item: string) => {
  async (dispatch: Dispatch<ItemsDispatchTypes>, getState: any) => {
    const state = getState().items;

    const newItem: IItem = {
      hasQuestionMark: item.includes("?"),
      author: author,
      value: item,
    };

    dispatch({
      type: ITEM_ADDED,
      payload: { newItem, ...state.items },
    });

    await listApiController.addItem(newItem).then(() => {
      refreshList();
    });
  };
};

export const updateItem = (itemKey: string, updateItemValue: string) => {
  async (dispatch: Dispatch<ItemsDispatchTypes>, getState: any) => {
    const state = getState().items;
    const tempItems = { ...state.items }; // todo

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = updateItemValue;
        tempItems[key].hasQuestionMark = updateItemValue.includes("?");
      }

      return tempItems[key];
    });

    dispatch({
      type: ITEM_UPDATED,
      payload: tempItems,
    });

    await listApiController.updateItem(itemKey, tempItems[itemKey]).then(() => {
      refreshList();
    });
  };
};

export const confirmItem = (itemKey: string) => {
  async (dispatch: Dispatch<ItemsDispatchTypes>, getState: any) => {
    const state = getState().items;
    const tempItems = { ...state.items }; // todo

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = tempItems[key].value.replace("?", "");
        tempItems[key].hasQuestionMark = false;
      }

      return tempItems[key];
    });

    dispatch({
      type: ITEM_CONFIRMED,
      payload: tempItems,
    });

    await listApiController.updateItem(itemKey, tempItems[itemKey]).then(() => {
      refreshList();
    });
  };
};

export const deleteItem = (itemKey: string) => {
  async (dispatch: Dispatch<ItemsDispatchTypes>, getState: any) => {
    const state = getState().items;
    const tempItems = { ...state.items };
    delete tempItems[itemKey];

    dispatch({
      type: ITEM_DELETED,
      payload: tempItems,
    });

    await listApiController.deleteItem(itemKey).then(() => {
      refreshList();
    });
  };
};

export const emptyList = () => {
  async (dispatch: Dispatch<ItemsDispatchTypes>) => {
    await listApiController.emptyList();

    dispatch({
      type: LIST_EMPTIED,
    });
  };
};
