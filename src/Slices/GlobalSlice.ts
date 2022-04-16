import { NamedSet } from 'zustand/middleware';
import { AppState } from '../Store/UseStore';

export interface IGlobalSlice {
  author: string;
  isAuthorLogged: boolean;
  setAuthor: (author: string) => void;
  isFetching: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalSlice = (set: NamedSet<AppState>) => ({
  author: '',
  isAuthorLogged: false,
  setAuthor: (author: string) => {
    set(
      state => {
        state.author = author;
        state.isAuthorLogged = true;
      },
      false,
      'setAuthor',
    );
  },
  isFetching: false,
});

export default globalSlice;
