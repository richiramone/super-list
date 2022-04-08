import create, { GetState } from 'zustand';
import { devtools, NamedSet, persist } from 'zustand/middleware';
import listSlice, { IListSlice } from '../Slices/ListSlice';
import globalSlice, { IGlobalSlice } from '../Slices/GlobalSlice';

export type AppState = IGlobalSlice & IListSlice;

const store = devtools(
  persist(
    (set: NamedSet<AppState>, get: GetState<AppState>) => ({
      ...globalSlice(set),
      ...listSlice(set, get),
    }),
    { name: 'superList' },
  ),
  { anonymousActionType: 'action' },
);

const useStore = create<AppState>(store);

export default useStore;
