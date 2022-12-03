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

// state hidden confirmdialog
// online disabled
// submit

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

  describe('click', () => {
    it('empties the list and hides the dialog', () => {
      render(<EmptyListButton />);
      const button = screen.getByTestId('emptyListButton');

      fireEvent.click(button);

      () => {
        expect(emptyList).toHaveBeenCalledOnce();
        const confirmationDialog = screen.queryByTestId('question');
        expect(confirmationDialog).toBeNull();
      };
    });
  });
});
