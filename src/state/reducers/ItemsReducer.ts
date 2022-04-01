import {
  ItemsDispatchTypes,
  ITEMS_REQUESTED,
  ITEMS_REFRESHED,
  ITEM_ADDED,
  ITEM_UPDATED,
  ITEM_CONFIRMED,
  ITEM_DELETED,
  LIST_EMPTIED,
  IItems,
} from "../../interfaces";
import { getItemsFromLocalStorage } from "../../utils";

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
        items: state.items,
      };
    case ITEMS_REFRESHED:
    case ITEM_ADDED:
    case ITEM_UPDATED:
    case ITEM_CONFIRMED:
    case ITEM_DELETED:
      return {
        isLoading: false,
        items: state.items,
      };
    case LIST_EMPTIED:
      return {
        isLoading: false,
        items: {},
      };
    default:
      return state;
  }
};

export default ItemsReducer;
