import React from 'react';
import { beforeEach, expect, it, afterEach, describe, vi } from 'vitest';
import AddItemForm from './addItemForm';
import { waitFor, render, screen, fireEvent, cleanup, act } from '@testing-library/react';

vi.mock('../../server/db-client', () => {
  return {
    insertItem: vi.fn().mockResolvedValue(Promise.resolve),
  };
});

describe('focus', () => {
  beforeAll(() => {});

  afterEach(() => {
    vi.resetModules();
    cleanup();
  });

  it('doesnt set focus inmediatly', () => {
    render(<AddItemForm />);
    const input = screen.getByPlaceholderText('altro...');

    expect(document.activeElement).not.equal(input);
  });

  it('set focus after item added', async () => {
    act(() => {
      render(<AddItemForm />);
    });
    const input = screen.getByTestId('addItemInput');

    expect(document.activeElement).not.equal(input);

    fireEvent.change(input, { target: { value: 'foo' } });

    act(() => {
      fireEvent.submit(screen.getByTestId('addItemForm'));
    });

    await waitFor(() => {
      expect(document.activeElement).equal(input);
    });
  });
});

describe('submit', () => {
  afterEach(() => {
    cleanup();
  });

  it.skip('empty item avoids submit', async () => {
    render(<AddItemForm />);
    fireEvent.submit(screen.getByTestId('addItemForm'));

    expect(vi.mock).equal(input);
  });
});
