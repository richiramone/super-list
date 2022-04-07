import create, { GetState, SetState } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import listSlice, { IListSlice } from '../Slices/ListSlice';
import globalSlice, { IGlobalSlice } from '../Slices/GlobalSlice';

export type AppState = IGlobalSlice & IListSlice;

const store = devtools(
  persist(
    (set: SetState<AppState>, get: GetState<AppState>) => ({
      ...globalSlice(set),
      ...listSlice(set, get),
    }),
    { name: 'superList' },
  ),
);

const useStore = create<AppState>(store);

export default useStore;
