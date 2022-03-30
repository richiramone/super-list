import { IItems } from "../config/interfaces";

export const ITEMS_REQUESTED = "ITEMS_REQUESTED";
export const ITEMS_RECEIVED = "ITEMS_RECEIVED";

interface ItemsRequested {
  type: typeof ITEMS_REQUESTED;
}

interface ItemsReceived {
  type: typeof ITEMS_RECEIVED;
  payload: {
    items: IItems;
  };
}

export type ItemsDispatchTypes = ItemsRequested | ItemsReceived;
