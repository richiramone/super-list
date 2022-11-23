import { NamedSet } from 'zustand/middleware';
import { AppState } from '../Store/UseStore';

export interface IGlobalSlice {
  author: string;
  isAuthorLogged: boolean;
  isOnline: boolean;
  setConnectionStatus: (isOnline: boolean) => void;
  setAuthor: (author: string) => void;
  isFetching: boolean;
  setIsFetching: (isFetching: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalSlice = (set: NamedSet<AppState>) => ({
  author: '',
  isAuthorLogged: false,
  isOnline: window.navigator.onLine,
  setConnectionStatus: (isOnline: boolean) => {
    set(
      state => {
        state.isOnline = isOnline;
      },
      false,
      'setIsOnline',
    );
  },
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
