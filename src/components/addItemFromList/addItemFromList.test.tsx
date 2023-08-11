import React from 'react';
import { expect, it, afterEach, describe, vi } from 'vitest';
import AddItemForm from './addItemFromList';
import { waitFor, render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { insertItem } from '../../server/db-client';

vi.mock('../../server/db-client', () => {
  return {
    insertItem: vi.fn().mockResolvedValue(Promise.resolve),
  };
});

describe('addItemForm', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('focus', () => {
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
    it('empty item avoids submit', () => {
      render(<AddItemForm />);
      fireEvent.submit(screen.getByTestId('addItemForm'));

      expect(insertItem).not.toBeCalled();
    });

    it('on proper submit insert item in db', () => {
      render(<AddItemForm />);
      const input = screen.getByTestId('addItemInput');

      fireEvent.change(input, { target: { value: 'foo' } });
      fireEvent.submit(screen.getByTestId('addItemForm'));

      expect(insertItem).toBeCalled();
    });
  });
});
