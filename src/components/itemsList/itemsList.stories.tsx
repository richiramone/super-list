import { useAtom } from 'jotai';
import React from 'react';
import { IItem } from '../../interfaces';
import ItemsList, { itemsAtom } from './itemsList';

export default {
  title: 'Components/ItemsList',
  component: ItemsList,
  render: () => <ItemsList />,
};

export const Default = () => {
  loaders: [
    async () => ({
      getItems: await Promise.resolve([
        {
          author: 'lucas',
          text: 'cheese',
          hasQuestionMark: true,
          hasDuplicate: false,
          id: 1,
        },
        {
          author: 'enzo',
          text: 'ham',
          hasQuestionMark: false,
          hasDuplicate: true,
          id: 2,
        },
        {
          author: 'slash',
          text: 'ham',
          hasQuestionMark: false,
          hasDuplicate: true,
          id: 3,
        },
      ] as IItem[]),
    }),
  ];

  return <ItemsList />;
};
