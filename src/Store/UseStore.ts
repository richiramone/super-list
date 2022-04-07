import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

import listSlice, { IListSlice } from '../Slices/ListSlice';
import globalSlice, { IGlobalSlice } from '../Slices/GlobalSlice';

export type AppState = IGlobalSlice & IListSlice;

const useStore = create<AppState>(
  devtools((set: SetState<AppState>, get: GetState<AppState>) => ({
    ...globalSlice(set),
    ...listSlice(set, get),
  })),
);

export default useStore;
