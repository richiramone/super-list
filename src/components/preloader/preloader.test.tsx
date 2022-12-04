import React from 'react';
import { expect, it, afterEach, describe } from 'vitest';
import Preloader from './preloader';
import { render, cleanup, renderHook, act } from '@testing-library/react';
import { isLoadingAtom } from '../../atoms';
import { useAtom } from 'jotai';

describe('preloader', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('ui states', () => {
    it('should have class fixed when isLoadingAtom is TRUE', () => {
      const { getByTestId } = render(<Preloader />);

      const preloader = getByTestId('preloader');

      expect(preloader.className.includes('fixed')).toBeTruthy();
    });

    it('should have class hidden when isLoadingAtom is FALSE', () => {
      const { result } = renderHook(() => useAtom(isLoadingAtom));
      const [, setIsLoadingAtom] = result.current;

      const { getByTestId } = render(<Preloader />);
      const preloader = getByTestId('preloader');

      act(() => setIsLoadingAtom(false));

      expect(preloader.className.includes('hidden')).toBeTruthy();
    });
  });
});
