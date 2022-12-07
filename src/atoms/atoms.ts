import { atom } from 'jotai';

export const isOnlineAtom = atom<boolean>(true);
export const isLoadingAtom = atom<boolean>(true);
export const needsRefreshAtom = atom<number>(0);
export const authorAtom = atom<string | null>(localStorage.getItem('author'));
