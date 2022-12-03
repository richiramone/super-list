import React from 'react';
import { expect, it, afterEach, describe, vi } from 'vitest';
import { render, cleanup, renderHook, act, fireEvent, screen } from '@testing-library/react';
import ConfirmItemButton from './confirmItemButton';
import { useAtom } from 'jotai';
import { isOnlineAtom } from '../../atoms';
import { updateItem } from '../../server/db-client';

vi.mock('../../server/db-client', () => {
  return {
    updateItem: vi.fn().mockResolvedValue(Promise.resolve),
  };
});
describe('confirmItemButton', () => {
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

      render(<ConfirmItemButton id="1" value="item" />);
      const button = document.querySelector('button');

      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('on confirm', () => {
    it('updates db item', async () => {
      render(<ConfirmItemButton id="1" value="foo bar?" />);

      const button = screen.getByTestId('confirmButton');
      fireEvent.click(button);

      () => {
        expect(updateItem).toHaveBeenCalledTimes(1);
        expect(updateItem).toHaveBeenCalledWith('1', 'foo bar');
      };
    });
  });
});
