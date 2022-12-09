import React from 'react';
import AddItemForm from './addItemForm';
import { rest } from 'msw';

export default {
  title: 'Components/AddItemForm',
  component: AddItemForm,
  parameters: {
    msw: {
      handlers: [
        rest.post(
          'https://eu-west.connect.psdb.cloud/psdb.v1alpha1.Database/Execute',
          (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json({}));
          },
        ),
      ],
    },
  },
};

export const Default = () => <AddItemForm />;
