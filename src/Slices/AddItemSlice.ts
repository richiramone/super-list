import { SetState } from 'zustand';
import { ListState } from '../Store/UseStore';

const addItemSlice = (set: SetState<ListState>) => ({
  addItem: () => {
    set(() => ({}));
  },
});

export default addItemSlice;
