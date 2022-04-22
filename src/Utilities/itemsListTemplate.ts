import { IItems } from '../Interfaces';

const items: string[] = [
  'spremuta',
  'mirtilli',
  'pasta ripiena',
  'yogurt',
  'latte anna x2',
  'latte agnese x3',
];
const itemsListTemplate: IItems = {};

items.forEach((item, index) => {
  itemsListTemplate[index] = {
    author: 'ramoslucasd@gmail.com',
    hasQuestionMark: false,
    value: item,
    isDuplicated: false,
  };
});

export default itemsListTemplate;
