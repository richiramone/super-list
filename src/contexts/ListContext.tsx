/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useEffect, FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { IListContext, IItem } from "../config/interfaces";
import { SuperListApiControlller } from "../controllers/superListApiControlller";

const urlParams = new URLSearchParams(window.location.search);
const authorFromParams = urlParams.has("author")
  ? urlParams.get("author")
  : "lucas";
const author = authorFromParams ? authorFromParams : "lucas";

const defaultState: IListContext = {
  author: author,
  items: [],
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
  emptyList: () => {},
};

export const ListContext = createContext<IListContext>(defaultState);

export const ListContextProvider: FC = ({ children }) => {
  //fetching products data from a public API
  /*const getItems = async (): Promise<IListItem[]> =>
    await (await fetch("https://fakestoreapi.com/products")).json();*/

  const [items, setItems] = useState(defaultState.items);

  useEffect(() => {
    const items = localStorage.getItem("items");
    const parsedItems = items !== null ? JSON.parse(items) : [];

    setItems(parsedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  });

  const addItem = (item: string) => {
    const newItem: IItem = { id: uuidv4(), author: author, value: item };

    SuperListApiControlller.getItems();

    setItems([...items, newItem]);
  };

  const updateItem = (id: string, updateItemValue: string) => {
    setItems(
      items.map((item: IItem) => {
        if (item.id === id) {
          item.value = updateItemValue;
        }
        return item;
      })
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item: { id: string }) => item.id !== id));
  };

  const emptyList = () => {
    setItems([]);
  };

  return (
    <ListContext.Provider
      value={{ author, items, addItem, deleteItem, updateItem, emptyList }}
    >
      {children}
    </ListContext.Provider>
  );
};
