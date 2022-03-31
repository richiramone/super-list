import {
  ItemsDispatchTypes,
  ITEMS_REQUESTED,
  ITEMS_REFRESHED,
  ITEM_ADDED,
  ITEM_UPDATED,
  ITEM_CONFIRMED,
  ITEM_DELETED,
  LIST_EMPTIED,
} from "../actions/ItemsActionTypes";
import { IItems } from "../config/interfaces";
import { getItemsFromLocalStorage } from "../utils/utils";

interface IDefaultState {
  isLoading?: boolean;
  items?: IItems;
}

const defaultState: IDefaultState = {
  isLoading: false,
  items: getItemsFromLocalStorage(),
};

const ItemsReducer = (
  state: IDefaultState = defaultState,
  action: ItemsDispatchTypes
): IDefaultState => {
  switch (action.type) {
    case ITEMS_REQUESTED:
      return {
        isLoading: true,
      };
    case ITEMS_REFRESHED:
      return {
        isLoading: false,
        items: state.items,
      };
    case ITEM_ADDED:
      return {
        items: state.items,
      };
    case ITEM_UPDATED:
      return {
        items: state.items,
      };
    case ITEM_CONFIRMED:
      return {
        items: state.items,
      };
    case ITEM_DELETED:
      return {
        items: state.items,
      };
    case LIST_EMPTIED:
      return {
        items: {},
      };
    default:
      return state;
  }
};

export default ItemsReducer;
