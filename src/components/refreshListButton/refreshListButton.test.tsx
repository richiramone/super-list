import React from 'react';
import { expect, it, afterEach, describe } from 'vitest';
import RefreshListButton from './refreshListButton';
import { render, fireEvent, cleanup, act, renderHook } from '@testing-library/react';
import { useAtom } from 'jotai';
import { isOnlineAtom, needsRefreshAtom } from '../../atoms';

describe('refreshListButton', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('ui states', () => {
    it('should be disabled when browser is offline', () => {
      const { result } = renderHook(() => useAtom(isOnlineAtom));
      const [, setIsOnlineAtom] = result.current;

      act(() => {
        setIsOnlineAtom(false);
      });

      const { getByTestId } = render(<RefreshListButton />);
      const buttonDisabledAttr = getByTestId('refreshListButton').hasAttribute('disabled');

      expect(buttonDisabledAttr).toBeTruthy();
    });

    it('should be enabled when browser is online', () => {
      const { result } = renderHook(() => useAtom(isOnlineAtom));
      const [, setIsOnlineAtom] = result.current;

      act(() => {
        setIsOnlineAtom(true);
      });

      const { getByTestId } = render(<RefreshListButton />);
      const buttonDisabledAttr = getByTestId('refreshListButton').hasAttribute('disabled');

      expect(buttonDisabledAttr).toBeFalsy();
    });
  });

  describe('click', () => {
    it('set needRefreshAtom to true', () => {
      const { result } = renderHook(() => useAtom(needsRefreshAtom));

      const { getByTestId } = render(<RefreshListButton />);

      act(() => fireEvent.click(getByTestId('refreshListButton')));

      expect(result.current[0]).toBeTruthy();
    });
  });
});
