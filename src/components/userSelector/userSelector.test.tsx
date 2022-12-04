import React from 'react';
import { expect, it, afterEach, describe } from 'vitest';
import UserSelector from './userSelector';
import { render, cleanup, act, renderHook, fireEvent } from '@testing-library/react';
import { useAtom } from 'jotai';
import { authorAtom } from '../../atoms';

describe('userSelector', () => {
  afterEach(async () => {
    cleanup();
    localStorage.removeItem('author');
  });

  describe('click', () => {
    it('should set LUCAS in authorAtom and localStorage on lucasButton click', () => {
      const { result } = renderHook(() => useAtom(authorAtom));

      const { getByTestId } = render(<UserSelector />);

      act(() => {
        fireEvent.click(getByTestId('lucasButton'));
      });

      expect(result.current[0]).toBe('lucas');
      expect(localStorage.getItem('author')).toBe('lucas');
    });

    it('should set ANNA in authorAtom and localStorage on annaButton click', () => {
      const { result } = renderHook(() => useAtom(authorAtom));

      const { getByTestId } = render(<UserSelector />);

      act(() => {
        fireEvent.click(getByTestId('annaButton'));
      });

      expect(result.current[0]).toBe('anna');
      expect(localStorage.getItem('author')).toBe('anna');
    });
  });
});
