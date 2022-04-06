import { GetState, SetState } from 'zustand';
import { ListState } from '../Store/UseStore';

const updateItemSlice = (set: SetState<ListState>, get: GetState<ListState>) => ({
  updateItem: () => {
    set(() => ({}));
  },
});

export default updateItemSlice;
