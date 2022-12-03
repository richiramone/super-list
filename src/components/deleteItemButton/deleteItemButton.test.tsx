import React from 'react';
import { expect, it, afterEach, describe, vi } from 'vitest';
import { render, cleanup, renderHook, act, fireEvent, screen } from '@testing-library/react';
import DeleteItemButton from './deleteItemButton';
import { useAtom } from 'jotai';
import { isOnlineAtom } from '../../atoms';
import { deleteItem } from '../../server/db-client';

vi.mock('../../server/db-client', () => {
  return {
    deleteItem: vi.fn().mockResolvedValue(Promise.resolve),
  };
});
describe('deleteItemButton', () => {
  afterEach(() => {
    cleanup();
  });

  describe('button attributes', () => {
    it('if offline button should be disabled', () => {
      const { result } = renderHook(() => useAtom(isOnlineAtom));
      const [, setIsOnlineAtom] = result.current;

      act(() => {
        setIsOnlineAtom(false);
      });

      render(<DeleteItemButton id="1" />);
      const button = document.querySelector('button');

      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('on confirm', () => {
    it('updates db item', async () => {
      render(<DeleteItemButton id="1" />);

      const button = screen.getByTestId('deleteItemButton');
      fireEvent.click(button);

      () => {
        expect(deleteItem).toHaveBeenCalledTimes(1);
        expect(deleteItem).toHaveBeenCalledWith('1');
      };
    });
  });
});
