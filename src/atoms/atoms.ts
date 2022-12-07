import { atom } from 'jotai';

export const isOnlineAtom = atom<boolean>(true);
export const isLoadingAtom = atom<boolean>(true);
export const needsRefreshAtom = atom<number>(0);

const authorFromLS = localStorage.getItem('author') === null ? '' : localStorage.getItem('author');
const authorWithTypeScriptHappiness = authorFromLS === null ? '' : authorFromLS;

export const authorAtom = atom<string>(authorWithTypeScriptHappiness);
