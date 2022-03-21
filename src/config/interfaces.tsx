export interface IItem {
  id: string;
  author: string;
  value: string;
}

export type IListContext = {
  author: string;
  items: IItem[];
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
  getItems: () => [IItem?];
  set: () => void;
  delete: () => void;
};
