import { GetState, SetState } from 'zustand';
import { MyState } from '../useStore';

export interface AddItemSlice {
  addItem: () => void;
}

const addItemSlice = (set: SetState<MyState>, get: GetState<MyState>) => ({
  addItem: () => {
    set(() => ({}));
  },
});

export default addItemSlice;
