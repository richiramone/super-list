import { SetState } from 'zustand';
import { ListState } from '../Store/UseStore';

const emptyListSlice = (set: SetState<ListState>) => ({
  emptyList: () => {
    set(() => ({}));
  },
});

export default emptyListSlice;
