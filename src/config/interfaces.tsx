export interface IItem {
  hasQuestionMark: boolean;
  author: string;
  value: string;
}

export type IItems = {
  [key: string]: IItem;
};

export type IListContext = {
  isPreloaderActive: boolean;
  author: string;
  items: IItems;
  refreshList: (shouldShowPreloader: boolean) => void;
  addItem: (item: string) => void;
  updateItem: (itemKey: string, updatedItem: string) => void;
  confirmItem: (itemKey: string) => void;
  deleteItem: (itemKey: string) => void;
  emptyList: () => void;
};

export type IItemContext = {
  isBeingEdited: boolean;
  isBeingDeleted: boolean;
  enableDeletedMode: () => void;
  disableDeletedMode: () => void;
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
