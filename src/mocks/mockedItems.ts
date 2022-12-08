import { IItem } from '../interfaces';

export const mockedItems: IItem[] = [
  {
    author: 'lucas',
    text: 'philadelphia',
    hasQuestionMark: false,
    hasDuplicate: false,
    id: 1,
  },
  {
    author: 'lucas',
    text: 'spremuta',
    hasQuestionMark: false,
    hasDuplicate: false,
    id: 2,
  },
  {
    author: 'lucas',
    text: 'cheese',
    hasQuestionMark: true,
    hasDuplicate: false,
    id: 3,
  },
  {
    author: 'anna',
    text: 'ham',
    hasQuestionMark: false,
    hasDuplicate: true,
    id: 4,
  },
  {
    author: 'anna',
    text: 'ham',
    hasQuestionMark: false,
    hasDuplicate: true,
    id: 5,
  },
];
