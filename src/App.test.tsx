import React from 'react';
import { expect, it, afterEach, describe } from 'vitest';
import App from './App';
import { render, cleanup } from '@testing-library/react';

describe('App', () => {
  afterEach(async () => {
    cleanup();
  });

  describe('render', () => {
    it('should render userSelector when author is not present in localStorage', () => {
      const { getByTestId } = render(<App />);

      expect(getByTestId('lucasButton')).not.toBeNull();
    });

    it.skip('should render itemsList when author is present in localStorage', () => {
      const { getByTestId } = render(<App />);

      expect(getByTestId('itemsList')).not.toBeNull();
    });
  });
});
