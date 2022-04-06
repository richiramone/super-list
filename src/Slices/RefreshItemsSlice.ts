import { SetState } from 'zustand';
import { ListState } from '../Store/UseStore';
import { baseRefreshItems } from '../Utilities';

const refreshItemsSlice = (set: SetState<ListState>) => ({
  refreshItems: async () => {
    set(state => {
      state.isFetching = true;
    });

    const items = await baseRefreshItems();

    set(state => {
      state.isFetching = false;
      state.items = items;
    });
  },
});

export default refreshItemsSlice;
