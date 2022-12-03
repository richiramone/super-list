import React from 'react';
import { expect, it, afterEach, describe, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ConfirmationDialog from './confirmationDialog';

const callbacks = {
  cancelCallback: vi.fn(),
  syncConfirmCallback: vi.fn(),
  asyncConfirmCallback: vi.fn().mockResolvedValue(Promise.resolve),
};

describe('confirmationDialog', () => {
  afterEach(() => {
    cleanup();
  });

  describe('focus', () => {
    it('sets focus after diagog was open', () => {
      render(
        <ConfirmationDialog
          question=""
          confirmCallback={callbacks.syncConfirmCallback}
          cancelCallback={callbacks.cancelCallback}
        />,
      );
      const button = screen.getByTestId('confirmButton');

      expect(document.activeElement).equal(button);
    });
  });

  describe('escape key & cancel callback', () => {
    it('on escape keypress it should fire cancelCallback', () => {
      render(
        <ConfirmationDialog
          question=""
          confirmCallback={callbacks.syncConfirmCallback}
          cancelCallback={callbacks.cancelCallback}
        />,
      );

      fireEvent.keyDown(window, { key: 'Escape', code: 'Escape', charCode: 27 });

      expect(callbacks.cancelCallback).toHaveBeenCalledOnce();
    });
  });

  describe('confirm callback', () => {
    it('call sync callback', () => {
      render(
        <ConfirmationDialog
          question=""
          confirmCallback={callbacks.syncConfirmCallback}
          cancelCallback={callbacks.cancelCallback}
        />,
      );
      const button = screen.getByTestId('confirmButton');
      fireEvent.click(button);

      expect(callbacks.syncConfirmCallback).toHaveBeenCalledOnce();
      expect(callbacks.asyncConfirmCallback).not.toHaveBeenCalled();
    });

    it('call async callback', async () => {
      render(
        <ConfirmationDialog
          question=""
          confirmCallback={callbacks.asyncConfirmCallback}
          cancelCallback={callbacks.cancelCallback}
        />,
      );
      const button = screen.getByTestId('confirmButton');
      fireEvent.click(button);

      expect(callbacks.syncConfirmCallback).not.toHaveBeenCalled();
      expect(callbacks.asyncConfirmCallback).toHaveBeenCalledOnce();
    });
  });

  describe('dialog content', () => {
    it('renders question properly', () => {
      render(
        <ConfirmationDialog
          question="foo bar?"
          confirmCallback={callbacks.syncConfirmCallback}
          cancelCallback={callbacks.cancelCallback}
        />,
      );

      const question = screen.getAllByTestId('question')[0].textContent;

      expect(question).toBe('foo bar?');
    });
  });
});
