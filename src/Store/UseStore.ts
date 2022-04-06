import create from 'zustand';

import addItemSlice, { AddItemSlice } from './Slices/AddItemSlice';

export type MyState = AddItemSlice;

const useStore = create<MyState>((set, get) => ({
  ...addItemSlice(set, get),
}));

export default useStore;