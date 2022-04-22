import { NamedSet } from 'zustand/middleware';
import { AppState } from '../Store/UseStore';

export interface IGlobalSlice {
  author: string;
  isAuthorLogged: boolean;
  setAuthor: (author: string) => void;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
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
  setIsFetching: (isFetching: boolean) => {
    set(
      state => {
        state.isFetching = isFetching;
      },
      false,
      'setIsFetching',
    );
  },
});

export default globalSlice;
