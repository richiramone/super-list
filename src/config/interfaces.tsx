export interface IItem {
  id: string;
  author: string;
  value: string;
}

export type IListContext = {
  author: string | null;
  items: IItem[];
  addItem: (item: string) => void;
  updateItem: (id: string, updatedItem: any) => void;
  deleteItem: (id: string) => void;
};
