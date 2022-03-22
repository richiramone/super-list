/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, useEffect, FC } from "react";
import { IListContext, IItem } from "../config/interfaces";
import { SuperListApiControlller } from "../controllers/superListApiControlller";

const urlParams = new URLSearchParams(window.location.search);
const authorFromParams = urlParams.has("author")
  ? urlParams.get("author")
  : "lucas";
const author = authorFromParams ? authorFromParams : "lucas";

const defaultState: IListContext = {
  isPreloaderActive: false,
  author: author,
  items: {},
  refreshList: () => {},
  addItem: () => {},
  updateItem: () => {},
  confirmItem: () => {},
  deleteItem: () => {},
  emptyList: () => {},
};

export const ListContext = createContext<IListContext>(defaultState);

export const ListContextProvider: FC = ({ children }) => {
  const [items, setItems] = useState(defaultState.items);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);

  useEffect(() => {
    const items = localStorage.getItem("items");
    const parsedItems = items !== null ? JSON.parse(items) : [];
    setItems(parsedItems);

    refreshList(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  });

  const refreshList = async (shouldShowPreloader?: boolean) => {
    if (shouldShowPreloader) {
      setIsPreloaderActive(true);
    }

    await SuperListApiControlller.getItems().then((items) => {
      setItems(items);
      setIsPreloaderActive(false);
    });
  };

  const addItem = async (item: string) => {
    const newItem: IItem = {
      hasQuestionMark: item.includes("?"),
      author: author,
      value: item,
    };

    await SuperListApiControlller.addItem(newItem).then(() => {
      refreshList();
    });

    setItems({ ...items, newItem });
  };

  const updateItem = async (itemKey: string, updateItemValue: string) => {
    const tempItems = { ...items };

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = updateItemValue;
        tempItems[key].hasQuestionMark = updateItemValue.includes("?");
      }

      return tempItems[key];
    });

    await SuperListApiControlller.updateItem(itemKey, tempItems[itemKey]).then(
      () => {
        refreshList();
      }
    );
    setItems(tempItems);
  };

  const confirmItem = async (itemKey: string) => {
    const tempItems = { ...items };

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = tempItems[key].value.replace("?", "");
        tempItems[key].hasQuestionMark = false;
      }

      return tempItems[key];
    });

    setItems(tempItems);
    await SuperListApiControlller.updateItem(itemKey, tempItems[itemKey]).then(
      () => {
        refreshList();
      }
    );
  };

  const deleteItem = async (itemKey: string) => {
    const tempItems = { ...items };
    delete tempItems[itemKey];
    setItems(tempItems);

    await SuperListApiControlller.deleteItem(itemKey).then(() => {
      refreshList();
    });
  };

  const emptyList = async () => {
    setItems({});
    await SuperListApiControlller.emptyList();
  };

  return (
    <ListContext.Provider
      value={{
        isPreloaderActive,
        author,
        items,
        refreshList,
        addItem,
        deleteItem,
        updateItem,
        confirmItem,
        emptyList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
