import { atom } from 'jotai';
import { getAuthor } from '../Utilities';

export const isOnlineAtom = atom<boolean>(true);
export const isLoadingAtom = atom<boolean>(true);
export const needsRefreshAtom = atom<number>(0);
export const authorAtom = atom<string>('');
