import { IItem } from '../interfaces';

export const getAuthor = () => {
  const params = new URLSearchParams(window.location.search);
  const userFromQS = params.has('user') ? params.get('user') : 'lucas';

  return userFromQS ? userFromQS : 'lucas';
};

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

export const noop = () => {};

export const sanitize = (input: string) => {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};
