import { IItem, IItems, ISuperListApiControlller } from "../config/interfaces";
import { db, itemsDbRef } from "../config/database";
import {
  push,
  get,
  set,
  DataSnapshot,
  update,
  remove,
  ref,
} from "firebase/database";

export const SuperListApiControlller: ISuperListApiControlller = {
  getItems: async () => {
    let items: IItems = {};

    await get(itemsDbRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          items = snapshot.val();
        }
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return items;
  },

  addItem: async (item: IItem) => {
    const newListRef = push(itemsDbRef);
    await set(newListRef, item);
  },

  updateItem: async (itemKey: string, item: IItem) => {
    const updates: IItems = {};
    updates[itemKey] = item;

    await update(itemsDbRef, updates);
  },

  deleteItem: async (itemKey: string) => {
    const dbItemRef = ref(db, `items/${itemKey}`);

    await remove(dbItemRef);
  },

  emptyList: async () => {
    await remove(itemsDbRef);
  },
};