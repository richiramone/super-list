export interface IItem {
  id: string;
  author: string;
  value: string;
}

export type IListContext = {
  items: IItem[];
  addItem?: (author: string, item: string) => void;
  updateItem?: (id: string, updatedItem: any) => void;
  deleteItem?: (id: string) => void;
};
