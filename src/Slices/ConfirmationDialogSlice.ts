import { NamedSet } from 'zustand/middleware';
import { AppState } from '../Store/UseStore';

export interface IConfirmationDialogSlice {
  shouldRenderConfirmationDialog: boolean;
  confirmationDialogQuestion: string;
  confirmationDialogCallbackFn?: () => void;
  renderConfirmationDialog: (question: string, callbackFn: () => void) => void;
  confirmationDialogCancelAction: () => void;
}

const confirmationDialogSlice = (set: NamedSet<AppState>) => {
  return {
    shouldRenderConfirmationDialog: false,
    confirmationDialogQuestion: '',
    renderConfirmationDialog: (question: string, callbackFn: () => void) => {
      set(
        state => {
          state.confirmationDialogQuestion = question;
          state.confirmationDialogCallbackFn = callbackFn;
          state.shouldRenderConfirmationDialog = true;
        },
        false,
        'confirmationDialog/confirm',
      );
    },
    confirmationDialogCancelAction: () => {
      set(
        state => {
          state.confirmationDialogQuestion = '';
          state.shouldRenderConfirmationDialog = false;
        },
        false,
        'confirmationDialog/cancel',
      );
    },
  };
};

export default confirmationDialogSlice;
