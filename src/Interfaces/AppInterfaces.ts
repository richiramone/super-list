export interface IItem {
  isDuplicated: boolean;
  hasQuestionMark: boolean;
  author: string;
  value: string;
}

export type IItems = {
  [key: string]: IItem;
};

export type IItemContext = {
  isBeingEdited: boolean;
  isBeingDeleted: boolean;
  enableDeletedMode: () => void;
  disableDeletedMode: () => void;
  enableEditingMode: () => void;
  disableEditingMode: () => void;
};

export type IListApiController = {
  getItems: () => Promise<IItems>;
  addItem: (item: IItem) => Promise<void>;
  updateItem: (itemKey: string, item: IItem) => Promise<void>;
  deleteItem: (itemKey: string) => Promise<void>;
  emptyList: () => Promise<void>;
};

export type IAuthContext = {
  isUserLoggedIn: boolean;
  userEmail: string;
  logUser: () => void;
};
