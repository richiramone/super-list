/* eslint-disable @typescript-eslint/ban-types */

export interface IItem {
  id: number;
  hasDuplicate?: boolean;
  hasQuestionMark: boolean;
  author: string;
  text: string;
}

export interface IConfirmationDialogSettings {
  shouldRender: boolean;
  question: string;
  confirmCallback: () => void | Promise<void>;
  cancelCallback?: () => void;
}
