import { SetState } from 'zustand';
import { ListState } from '../Store/UseStore';

const deleteItemSlice = (set: SetState<ListState>) => ({
  deleteItem: () => {
    set(() => ({}));
  },
});

export default deleteItemSlice;
