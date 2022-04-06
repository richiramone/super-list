import { GetState, SetState } from 'zustand';
import { ListState } from '../Store/UseStore';

const confirmItemSlice = (set: SetState<ListState>, get: GetState<ListState>) => ({
  confirmItem: () => {
    set(() => ({}));
  },
});

export default confirmItemSlice;
