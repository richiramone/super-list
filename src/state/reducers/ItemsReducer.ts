import {
  ItemsDispatchTypes,
  ITEMS_REQUESTED,
  ITEMS_RECEIVED,
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
        ...state,
        isLoading: true,
      };
    case ITEMS_RECEIVED:
    case ITEM_ADDED:
    case ITEM_UPDATED:
    case ITEM_CONFIRMED:
    case ITEM_DELETED:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
      };
    case LIST_EMPTIED:
      return {
        ...state,
        isLoading: false,
        items: {},
      };
    default:
      return state;
  }
};

export default ItemsReducer;
