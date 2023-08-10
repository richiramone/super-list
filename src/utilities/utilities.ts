import { IItem } from '../interfaces';

export const hasDuplicatedValue = (
  items: IItem[],
  newValue: string,
  shouldBeExact: boolean = false,
) => {
  let alreadyExists = false;

  items.every(item => {
    const itemValue = item.text.toLowerCase();
    const newValueLowered = newValue.toLowerCase();

    if (shouldBeExact && itemValue === newValueLowered) {
      alreadyExists = true;
    } else if (
      !shouldBeExact &&
      (itemValue.includes(newValueLowered) || newValueLowered.includes(itemValue))
    ) {
      alreadyExists = true;
    } else {
      return true;
    }

    return itemValue.includes(newValueLowered) || newValueLowered.includes(itemValue);
  });

  return alreadyExists;
};

export const noop = () => {};

export const sanitize = (input: string) => {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

export const areItemsDifferent = (items1: IItem[], items2: IItem[]) => {
  return JSON.stringify(items1) !== JSON.stringify(items2);
};

// TODO
// export const updateHasDuplicatedProperty = (items: IItem[]) => {
//   items.map(item => {
//     if (item.hasDuplicate && !hasDuplicatedValue(items, item.text)) {
//       item.hasDuplicate = false;
//     }
//   });
// };
