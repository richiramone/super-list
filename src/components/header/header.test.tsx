import React from 'react';
import { expect, it, afterEach, describe } from 'vitest';
import Header from './header';
import { render, screen, cleanup, act, renderHook } from '@testing-library/react';
import { useAtom } from 'jotai';
import { isOnlineAtom } from '../../atoms';

describe('header', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('ui states', () => {
    it('shouldnt render all of its components', () => {
      render(<Header />);
      const header = screen.queryByTestId('header');
      const refreshListButton = screen.queryByTestId('refreshListButton');
      const emptyListButton = screen.queryByTestId('emptyListButton');

      expect(header).not.toBeNull();
      expect(refreshListButton).not.toBeNull();
      expect(emptyListButton).not.toBeNull();
    });

    it('should have opacity when offline', () => {
      const { result } = renderHook(() => useAtom(isOnlineAtom));
      const [, setIsOnlineAtom] = result.current;

      act(() => {
        setIsOnlineAtom(false);
      });

      const { getByText } = render(<Header />);
      const header = getByText('SuperList');

      expect(header.classList.contains('opacity-50')).toBeTruthy();
    });

    it('should NOT have opacity when online', () => {
      const { result } = renderHook(() => useAtom(isOnlineAtom));
      const [, setIsOnlineAtom] = result.current;

      act(() => {
        setIsOnlineAtom(true);
      });

      const { getByText } = render(<Header />);
      const header = getByText('SuperList');

      expect(header.classList.contains('opacity-50')).toBeFalsy();
    });
  });
});
