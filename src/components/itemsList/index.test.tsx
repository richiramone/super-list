import React from 'react';
import { expect, it, afterEach, describe } from 'vitest';
import ItemsList, { itemsAtom } from './itemsList';
import { render, screen, cleanup, act, renderHook } from '@testing-library/react';
import { useAtom } from 'jotai';

describe('itemsList', () => {
  afterEach(async () => {
    cleanup();
  });

  it('renders full item list with proper components and css classes', () => {
    render(<ItemsList />);
    const { result } = renderHook(() => useAtom(itemsAtom));
    const [, setItems] = result.current;

    act(() => {
      setItems([
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
      ]);
    });

    const items = screen.getAllByTestId('item');
    const duplicatedItems = document.querySelectorAll('.bg-item-is-duplicated');
    const itemsWithQuestionMark = document.querySelectorAll('.bg-item-has-question-mark');
    const notLucasUsers = document.querySelectorAll('.bg-item-is-anna');

    expect(items).toHaveLength(3);
    expect(duplicatedItems).toHaveLength(2);
    expect(itemsWithQuestionMark).toHaveLength(1);
    expect(notLucasUsers).toHaveLength(2);
  });
});
