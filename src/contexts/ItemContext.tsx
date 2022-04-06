/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, FC } from 'react';
import { IItemContext } from '../Interfaces/AppInterfaces';

const defaultState: IItemContext = {
  isBeingDeleted: false,
  isBeingEdited: false,
  enableDeletedMode: () => {},
  disableDeletedMode: () => {},
  enableEditingMode: () => {},
  disableEditingMode: () => {},
};

export const ItemContext = createContext<IItemContext>(defaultState);

export const ItemContextProvider: FC = ({ children }) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isBeingDeleted, setIsBeingDeleted] = useState(false);

  const enableEditingMode = () => {
    setIsBeingEdited(true);
  };

  const disableEditingMode = () => {
    setIsBeingEdited(false);
  };

  const enableDeletedMode = () => {
    setIsBeingDeleted(true);
  };

  const disableDeletedMode = () => {
    setIsBeingDeleted(false);
  };

  return (
    <ItemContext.Provider
      value={{
        isBeingDeleted: isBeingDeleted,
        isBeingEdited: isBeingEdited,
        enableDeletedMode,
        disableDeletedMode,
        enableEditingMode,
        disableEditingMode,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
