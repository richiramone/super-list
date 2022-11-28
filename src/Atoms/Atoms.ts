import { getAuthor, noop } from '../Utilities';
import { atom } from 'jotai';
import { IConfirmationDialogSettings } from '../Interfaces';

export const isOnlineAtom = atom<boolean>(true);
export const isLoadingAtom = atom<boolean>(true);
export const needsRefreshAtom = atom<boolean>(false);
export const authorAtom = atom<string>(getAuthor());
export const confirmationDialogSettingsAtom = atom<IConfirmationDialogSettings>({
  shouldRender: false,
  question: '',
  cancelCallback: noop,
  confirmCallback: noop,
});
