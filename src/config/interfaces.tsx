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
  updateItem: (id: string, updatedItem: string) => void;
  deleteItem: (id: string) => void;
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
};
