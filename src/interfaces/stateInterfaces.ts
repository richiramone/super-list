import { IItems } from "../interfaces";

export const ITEMS_REQUESTED = "ITEMS_REQUESTED";
export const ITEMS_RECEIVED = "ITEMS_RECEIVED";
export const ITEM_ADDED = "ITEM_ADDED";
export const ITEM_UPDATED = "ITEM_UPDATED";
export const ITEM_CONFIRMED = "ITEM_CONFIRMED";
export const ITEM_DELETED = "ITEM_DELETED";
export const LIST_EMPTIED = "LIST_EMPTIED";

interface IItemsRequested {
  type: typeof ITEMS_REQUESTED;
}

interface IItemsRefreshed {
  type: typeof ITEMS_RECEIVED;
  payload: IItems;
}

interface IItemAdded {
  type: typeof ITEM_ADDED;
  payload: IItems;
}

interface IItemUpdated {
  type: typeof ITEM_UPDATED;
  payload: IItems;
}

interface IItemConfirmed {
  type: typeof ITEM_CONFIRMED;
  payload: IItems;
}

interface IItemDeleted {
  type: typeof ITEM_DELETED;
  payload: IItems;
}

interface IListEmptied {
  type: typeof LIST_EMPTIED;
}

export type ItemsDispatchTypes =
  | IItemsRequested
  | IItemsRefreshed
  | IItemAdded
  | IItemUpdated
  | IItemConfirmed
  | IItemDeleted
  | IListEmptied;
