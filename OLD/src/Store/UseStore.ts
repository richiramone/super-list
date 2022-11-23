import create, { GetState } from 'zustand';
import { devtools, NamedSet, persist } from 'zustand/middleware';
import listSlice, { IListSlice } from '../Slices/ListSlice';
import globalSlice, { IGlobalSlice } from '../Slices/GlobalSlice';
import confirmationDialogSlice, {
  IConfirmationDialogSlice,
} from '../Slices/ConfirmationDialogSlice';

export type AppState = IGlobalSlice & IConfirmationDialogSlice & IListSlice;

const store = devtools(
  persist(
    (set: NamedSet<AppState>, get: GetState<AppState>) => ({
      ...globalSlice(set),
      ...confirmationDialogSlice(set),
      ...listSlice(set, get),
    }),
    { name: 'superList' },
  ),
  { anonymousActionType: 'action' },
);

const useStore = create<AppState>(store);

export default useStore;
