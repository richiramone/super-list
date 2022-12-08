import React from 'react';
import { expect, it, afterEach, describe, vi } from 'vitest';
import EmptyListButton from './emptyListButton';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { emptyList } from '../../server/db-client';

vi.mock('../../server/db-client', () => {
  return {
    emptyList: vi.fn().mockResolvedValue(Promise.resolve),
  };
});

describe('emptyListButton', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('ui states', () => {
    it('shouldnt render confirmationDialog on first render', () => {
      render(<EmptyListButton />);
      const confirmationDialog = screen.queryByTestId('question');

      expect(confirmationDialog).toBeNull();
    });

    it('should render confirmationDialog after click', () => {
      render(<EmptyListButton />);
      const emptyListButton = screen.getByTestId('emptyListButton');

      fireEvent.click(emptyListButton);

      const confirmationDialog = screen.queryByTestId('question');
      expect(confirmationDialog).not.toBeNull();
    });
  });
});

describe('emptyListButton', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('clicks', () => {
    it('should hide on cancel click', () => {
      render(<EmptyListButton />);
      const emptyListButton = screen.getByTestId('emptyListButton');

      fireEvent.click(emptyListButton);

      const cancelButton = screen.getByText('No');

      fireEvent.click(cancelButton);

      const confirmationDialog = screen.queryByTestId('question');

      expect(confirmationDialog).toBeNull();
    });

    it('should empty the list', () => {
      render(<EmptyListButton />);
      const emptyListButton = screen.getByTestId('emptyListButton');

      fireEvent.click(emptyListButton);

      const confirmButton = screen.getByText('Si');

      fireEvent.click(confirmButton);

      expect(emptyList).toHaveBeenCalledOnce();
    });
  });
});
