import { IItem } from '../interfaces';

export const hasDuplicatedValue = (items: IItem[], newValue: string, hasQuestionMark?: boolean) => {
  let alreadyExists = false;

  items.every(item => {
    const itemValue = item.text.toLowerCase();
    const newValueLowered = newValue.toLowerCase();

    if (typeof hasQuestionMark === 'undefined' && itemValue === newValueLowered) {
      alreadyExists = true;
    } else if (itemValue === newValueLowered && item.hasQuestionMark == hasQuestionMark) {
      alreadyExists = true;
    }
  });

  return alreadyExists;
};

export const getDuplicatedAmounts = (items: IItem[], newValue: string) => {
  let repetitions = 0;

  items.map(item => {
    const itemValue = item.text.toLowerCase();
    const newValueLowered = newValue.toLowerCase();

    if (itemValue.includes(newValueLowered) || newValueLowered.includes(itemValue)) {
      repetitions = repetitions + 1;
    }
  });

  return repetitions;
};

export const sanitize = (input: string) => {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

export const areItemsDifferent = (items1: IItem[], items2: IItem[]) => {
  return JSON.stringify(items1) !== JSON.stringify(items2);
};
