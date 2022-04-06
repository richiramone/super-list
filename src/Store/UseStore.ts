import create from 'zustand';
import refreshItemsSlice from '../Slices/RefreshItemsSlice';
import addItemSlice from '../Slices/AddItemSlice';
import updateItemSlice from '../Slices/UpdateItemSlice';
import confirmItemSlice from '../Slices/ConfirmItemSlice';
import deleteItemSlice from '../Slices/DeleteItemSlice';
import emptyListSlice from '../Slices/EmptyListSlice';
import { IItems } from '../Interfaces';
import { getItemsFromLocalStorage } from '../Utilities';

export interface ListState {
  items: IItems;
  isFetching: boolean;
  refreshItems: () => void;
  addItem: () => void;
  updateItem: () => void;
  confirmItem: () => void;
  deleteItem: () => void;
  emptyList: () => void;
}

const useStore = create<ListState>((set, get) => ({
  items: getItemsFromLocalStorage(),
  isFetching: true,
  ...refreshItemsSlice(set),
  ...addItemSlice(set),
  ...updateItemSlice(set, get),
  ...confirmItemSlice(set, get),
  ...deleteItemSlice(set),
  ...emptyListSlice(set),
}));

export default useStore;
