import { getAuthor } from '../Utilities';
import { atom } from 'jotai';

export interface IItem {
  id: number;
  hasDuplicate: boolean;
  hasQuestionMark: boolean;
  author: string;
  text: string;
}

export const isLoadingAtom = atom<boolean>(true);
export const needsRefreshAtom = atom<boolean>(false);
export const authorAtom = atom<string>(getAuthor());
