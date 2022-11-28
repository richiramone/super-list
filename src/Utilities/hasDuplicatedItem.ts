import { IItem } from '../Interfaces';

export const hasDuplicatedValue = (items: IItem[], newValue: string) => {
  let alreadyExists = false;

  items.every(item => {
    const itemValue = item.text.toLowerCase();
    const newValueLowered = newValue.toLowerCase();

    if (itemValue.includes(newValueLowered) || newValueLowered.includes(itemValue)) {
      alreadyExists = true;
    } else {
      return true;
    }
  });

  return alreadyExists;
};
