import React from 'react';
import { IItem } from '../../interfaces';
import Item from './item';

export default {
  title: 'Components/Item',
  component: Item,
};

export const Lucas = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Item
        id="1"
        item={
          {
            id: 1,
            author: 'lucas',
            text: 'roquefort',
            hasQuestionMark: false,
            hasDuplicate: false,
          } as IItem
        }
      />
    </div>
  );
};

export const Duplicated = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Item
        id="1"
        item={
          {
            id: 1,
            author: 'lucas',
            text: 'roquefort',
            hasQuestionMark: false,
            hasDuplicate: true,
          } as IItem
        }
      />
    </div>
  );
};

export const Anna = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Item
        id="1"
        item={
          {
            id: 1,
            author: 'anna',
            text: 'roquefort',
            hasQuestionMark: false,
            hasDuplicate: false,
          } as IItem
        }
      />
    </div>
  );
};

export const WithQuestion = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Item
        id="1"
        item={
          {
            id: 1,
            author: 'anna',
            text: 'roquefort?',
            hasQuestionMark: true,
            hasDuplicate: false,
          } as IItem
        }
      />
    </div>
  );
};
