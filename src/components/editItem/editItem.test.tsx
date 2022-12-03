import React from 'react';
import { expect, it, afterEach, describe, vi } from 'vitest';
import EditItem from './editItem';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { updateItem } from '../../server/db-client';

vi.mock('../../server/db-client', () => {
  return {
    updateItem: vi.fn().mockResolvedValue(Promise.resolve),
  };
});

describe('editItem', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('submit', () => {
    it('empty item avoids submit', () => {
      render(<EditItem id="1" value="test" />);
      const input = screen.getByTestId('editItemInput');

      fireEvent.change(input, { target: { value: '' } });
      fireEvent.submit(screen.getByTestId('editItemForm'));

      expect(updateItem).not.toBeCalled();
    });

    it('on proper submit insert item in db', () => {
      render(<EditItem id="1" value="test" />);
      const input = screen.getByTestId('editItemInput');

      fireEvent.change(input, { target: { value: 'foo' } });
      fireEvent.submit(screen.getByTestId('editItemForm'));

      expect(updateItem).toBeCalled();
      expect(updateItem).toBeCalledWith('1', 'foo');
    });
  });
});
