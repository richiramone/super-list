import { IItem, IItems, ISuperListApiControlller } from "../config/interfaces";
import { dbRef } from "../config/database";
import { push, get, set, DataSnapshot } from "firebase/database";

export const SuperListApiControlller: ISuperListApiControlller = {
  getItems: async () => {
    let items: IItems = {};

    await get(dbRef)
      .then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          items = snapshot.val();
        }
      })
      .catch((error: any) => {
        console.error(error);
      });

    return items;
  },
  addItem: async (item: IItem) => {
    const newListRef = push(dbRef);
    await set(newListRef, item);
  },
};
