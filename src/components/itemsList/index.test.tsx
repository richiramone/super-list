import React from 'react';
import { expect, it, afterEach, describe } from 'vitest';
import ItemsList, { itemsAtom } from './itemsList';
import { render, screen, cleanup, act, renderHook } from '@testing-library/react';
import { useAtom } from 'jotai';
import { needsRefreshAtom } from '../../atoms';
import { getItems } from '../../server/db-client';
import { mockedItems } from '../../mocks/mockedItems';

vi.mock('../../server/db-client', () => {
  return {
    getItems: vi.fn().mockResolvedValue([]),
  };
});

describe('itemsList', () => {
  afterEach(async () => {
    cleanup();
  });

  it('renders full item list with proper components and css classes', () => {
    render(<ItemsList />);
    const { result } = renderHook(() => useAtom(itemsAtom));
    const [, setItems] = result.current;

    act(() => {
      setItems(mockedItems);
    });

    const items = screen.getAllByTestId('item');
    const duplicatedItems = document.querySelectorAll('.bg-item-is-duplicated');
    const itemsWithQuestionMark = document.querySelectorAll('.bg-item-has-question-mark');
    const notLucasUsers = document.querySelectorAll('.bg-item-is-anna');

    expect(items).toHaveLength(5);
    expect(duplicatedItems).toHaveLength(2);
    expect(itemsWithQuestionMark).toHaveLength(1);
    expect(notLucasUsers).toHaveLength(2);
  });

  it('updates the list when needsRefresh is true', () => {
    const { result } = renderHook(() => useAtom(needsRefreshAtom));
    const [needsRefresh, setNeedsRefreshAtom] = result.current;

    render(<ItemsList />);

    act(() => {
      setNeedsRefreshAtom(needsRefresh + 1);
    });

    expect(getItems).toHaveBeenCalledTimes(2);
  });
});
