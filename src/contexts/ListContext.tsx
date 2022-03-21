/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useEffect, FC } from "react";
import { IListContext, IItem, IItems } from "../config/interfaces";
import { SuperListApiControlller } from "../controllers/superListApiControlller";

const urlParams = new URLSearchParams(window.location.search);
const authorFromParams = urlParams.has("author")
  ? urlParams.get("author")
  : "lucas";
const author = authorFromParams ? authorFromParams : "lucas";

const defaultState: IListContext = {
  author: author,
  items: {},
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
  emptyList: () => {},
};

export const ListContext = createContext<IListContext>(defaultState);

export const ListContextProvider: FC = ({ children }) => {
  const [items, setItems] = useState(defaultState.items);

  useEffect(() => {
    // const items = localStorage.getItem("items");
    // const parsedItems = items !== null ? JSON.parse(items) : [];
    // todo: merge with localStorage

    const getItemsAsync = async () => {
      setItems(await SuperListApiControlller.getItems());
    };

    getItemsAsync();
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  });

  const addItem = (item: string) => {
    const newItem: IItem = {
      hasQuestionMark: item.includes("?"),
      author: author,
      value: item,
    };

    SuperListApiControlller.addItem(newItem);

    setItems({ ...items, newItem });
  };

  const updateItem = (itemKey: string, updateItemValue: string) => {
    Object.keys(items).map((key: string) => {
      if (itemKey === key) {
        items[key].value = updateItemValue;
      }
      return items[key];
    });

    setItems(items);
  };

  const deleteItem = (id: string) => {
    // setItems(items.filter((item: { id: string }) => item.id !== id));
  };

  const emptyList = () => {
    setItems({});
  };

  return (
    <ListContext.Provider
      value={{ author, items, addItem, deleteItem, updateItem, emptyList }}
    >
      {children}
    </ListContext.Provider>
  );
};
