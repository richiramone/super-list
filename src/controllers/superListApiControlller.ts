import { IItem, ISuperListApiControlller } from "../config/interfaces";
import { dbRef } from "../config/database";
import { get, child, DataSnapshot } from "firebase/database";

export const SuperListApiControlller: ISuperListApiControlller = {
  getItems: () => {
    let items: [IItem?] = [];

    get(child(dbRef, "items"))
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
  set: () => {
    console.log("set");
  },
  delete: () => {
    console.log("set");
  },
};
