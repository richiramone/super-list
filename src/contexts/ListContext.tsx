import { createContext, useState, FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { IListContext } from "../config/interfaces";

const defaultState: IListContext = {
  items: [
    {
      id: "1",
      author: "lucas",
      value: "tripps",
    },
  ],
};

export const ListContext = createContext<IListContext>(defaultState);

export const ListContextProvider: FC = ({ children }) => {
  //fetching products data from a public API
  /*const getItems = async (): Promise<IListItem[]> =>
    await (await fetch("https://fakestoreapi.com/products")).json();*/

  const [items, setItems] = useState(defaultState.items);

  const addItem = (author: string, item: string) => {
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
