import { createContext, useState, useEffect, FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { IListContext } from "../config/interfaces";

const urlParams = new URLSearchParams(window.location.search);
const author = urlParams.has("author") ? urlParams.get("author") : "lucas";

const defaultState: IListContext = {
  author: author,
  items: [],
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
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
    setItems([...items, { id: uuidv4(), author: author, value: item }]);
  };

  const updateItem = (id: string, updatedItem: any) => {
    setItems(
      items.map((item: { id: any }) => (item.id === id ? updatedItem : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item: { id: any }) => item.id !== id));
  };

  return (
    <ListContext.Provider value={{ items, addItem, deleteItem, updateItem }}>
      {children}
    </ListContext.Provider>
  );
};
