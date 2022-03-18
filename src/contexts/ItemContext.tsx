import { createContext, useState, FC } from "react";
import { IItemContext } from "../config/interfaces";

const defaultState: IItemContext = {
  isEditing: false,
  enableEditingMode: () => {},
  disableEditingMode: () => {},
};

export const ItemContext = createContext<IItemContext>(defaultState);

export const ItemContextProvider: FC = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);

  const enableEditingMode = () => {
    setIsEditing(true);
  };

  const disableEditingMode = () => {
    setIsEditing(false);
  };

  return (
    <ItemContext.Provider
      value={{
        isEditing,
        enableEditingMode,
        disableEditingMode,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
