import { IItem, IItems, IListApiController } from '../Interfaces/AppInterfaces';
import { db, itemsDbRef } from '../Firebase/Database';
import * as Firebase from 'firebase/database';
import { reverseItems } from '../Utilities';

export const listApiController: IListApiController = {
  getItems: async () => {
    let items: IItems = {};

    await Firebase.get(itemsDbRef)
      .then((snapshot: Firebase.DataSnapshot) => {
        if (snapshot.exists()) {
          items = snapshot.val();
        }
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return reverseItems(items);
  },

  addItem: async (item: IItem) => {
    const newListRef = Firebase.push(itemsDbRef);
    await Firebase.set(newListRef, item);
  },

  updateItem: async (itemKey: string, item: IItem) => {
    const updates: IItems = {};
    updates[itemKey] = item;

    await Firebase.update(itemsDbRef, updates);
  },

  deleteItem: async (itemKey: string) => {
    const dbItemRef = Firebase.ref(db, `items/${itemKey}`);

    await Firebase.remove(dbItemRef);
  },

  emptyList: async () => {
    await Firebase.remove(itemsDbRef);
  },
};
