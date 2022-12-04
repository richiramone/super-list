import React from 'react';
import { expect, it, afterEach, describe } from 'vitest';
import Item from './item';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { IItem } from '../../interfaces';

const fakeItem: IItem = {
  author: 'jordan',
  text: 'cheese',
  hasQuestionMark: false,
  hasDuplicate: false,
  id: 1,
};

describe('item', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('ui states', () => {
    it('renders standard item with regular IItem', () => {
      render(<Item item={fakeItem} id="1" />);
      const itemText = screen.getByTestId('itemText');
      const editItemInput = screen.queryByTestId('editItemInput');
      const confirmItemButton = screen.queryByTestId('confirmButton');
      const deleteItemButton = screen.queryByTestId('deleteItemButton');

      expect(itemText).not.toBeNull();
      expect(editItemInput).toBeNull();
      expect(confirmItemButton).toBeNull();
      expect(deleteItemButton).not.toBeNull();
    });

    it('renders confirm button with hasQuestionMark IItem', () => {
      render(<Item item={{ ...fakeItem, hasQuestionMark: true }} id="1" />);
      const itemText = screen.getByTestId('itemText');
      const confirmItemButton = screen.queryByTestId('confirmButton');

      expect(itemText).not.toBeNull();
      expect(confirmItemButton).not.toBeNull();
    });

    it('renders editItem on text click', () => {
      render(<Item item={fakeItem} id="1" />);
      const itemText = screen.getByTestId('itemText');
      let editItemInput = screen.queryByTestId('editItemInput');

      expect(editItemInput).toBeNull();

      fireEvent.click(itemText);

      editItemInput = screen.queryByTestId('editItemInput');

      expect(editItemInput).not.toBeNull();
    });

    it('renders editItem on text click', () => {
      render(<Item item={fakeItem} id="1" />);
      const item = screen.getByTestId('item');
      let itemText = screen.queryByTestId('itemText');

      fireEvent.click(itemText as HTMLElement);

      let editItemInput = screen.queryByTestId('editItemInput');
      expect(editItemInput).not.toBeNull();

      itemText = screen.queryByTestId('itemText');
      expect(itemText).toBeNull();
    });

    it('resets editItem on blur', () => {
      render(<Item item={fakeItem} id="1" />);

      let itemText = screen.queryByTestId('itemText');

      fireEvent.click(itemText as HTMLElement);

      const editItemInput = screen.getByTestId('editItemInput');

      expect(editItemInput).not.toBeNull();

      const item = screen.getByTestId('item');
      itemText = screen.queryByTestId('itemText');
      expect(itemText).toBeNull();

      fireEvent.blur(item);

      setTimeout(() => {
        expect(screen.getByTestId('itemText')).not.toBeNull();
        expect(screen.queryByTestId('editItemInput')).toBeNull();
      }, 100);
    });
  });
});
