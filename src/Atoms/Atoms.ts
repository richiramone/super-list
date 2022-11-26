import { getAuthor } from '../Utilities';
import { atom } from 'jotai';

export const isOnlineAtom = atom<boolean>(true);
export const isLoadingAtom = atom<boolean>(true);
export const needsRefreshAtom = atom<boolean>(false);
export const authorAtom = atom<string>(getAuthor());
