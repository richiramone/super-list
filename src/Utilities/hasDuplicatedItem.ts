import { IItem } from '../Atoms';

export const hasDuplicatedValue = (items: IItem[], newValue: string) => {
  let alreadyExists = false;

  for (const [key] of Object.entries(items)) {
    const itemValue = items[0].text.toLowerCase();
    const newValueLowered = newValue.toLowerCase();

    if (itemValue.includes(newValueLowered) || newValueLowered.includes(itemValue)) {
      alreadyExists = true;
      break;
    }
  }

  return alreadyExists;
};
