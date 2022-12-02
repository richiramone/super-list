import React from 'react';
import renderer from 'react-test-renderer';
import { expect, it } from 'vitest';
import AddItemForm from './addItemForm';

it('should work', ctx => {
  renderer.create(<AddItemForm />);
  expect(true).toBeTruthy();
});
