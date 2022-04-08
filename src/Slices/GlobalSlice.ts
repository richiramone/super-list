import { NamedSet } from 'zustand/middleware';
import { AppState } from '../Store/UseStore';
import { getAuthor } from '../Utilities';

export interface IGlobalSlice {
  author: string;
  isFetching: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalSlice = (set: NamedSet<AppState>) => ({
  author: getAuthor(),
  isFetching: false,
});

export default globalSlice;
