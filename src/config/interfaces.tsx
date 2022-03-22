export interface IItem {
  hasQuestionMark: boolean;
  author: string;
  value: string;
}

export type IItems = {
  [key: string]: IItem;
};

export type IListContext = {
  author: string;
  items: IItems;
  addItem: (item: string) => void;
  updateItem: (itemKey: string, updatedItem: string) => void;
  confirmItem: (itemKey: string) => void;
  deleteItem: (itemKey: string) => void;
  emptyList: () => void;
};

export type IItemContext = {
  isEditing: boolean;
  enableEditingMode: () => void;
  disableEditingMode: () => void;
};

export type ISuperListApiControlller = {
  getItems: () => Promise<IItems>;
  addItem: (item: IItem) => Promise<void>;
  updateItem: (itemKey: string, item: IItem) => Promise<void>;
  deleteItem: (itemKey: string) => Promise<void>;
  emptyList: () => Promise<void>;
};
