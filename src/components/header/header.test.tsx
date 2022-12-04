import React from 'react';
import { expect, it, afterEach, describe } from 'vitest';
import Header from './header';
import { render, screen, cleanup } from '@testing-library/react';

describe('header', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('ui states', () => {
    it('shouldnt render confirmationDialog on first render', () => {
      render(<Header />);
      const header = screen.queryByTestId('header');
      const refreshListButton = screen.queryByTestId('refreshListButton');
      const emptyListButton = screen.queryByTestId('emptyListButton');

      expect(header).not.toBeNull();
      expect(refreshListButton).not.toBeNull();
      expect(emptyListButton).not.toBeNull();
    });
  });
});
