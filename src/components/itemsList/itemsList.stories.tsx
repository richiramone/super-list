import React from 'react';
import ItemsList from './itemsList';
import mockedItems from '../../mocks/mockedExecute.json';
import { rest } from 'msw';

export default {
  title: 'Components/ItemsList',
  component: ItemsList,
  parameters: {
    msw: {
      handlers: [
        rest.post(
          'https://aws.connect.psdb.cloud/psdb.v1alpha1.Database/Execute',
          (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json(mockedItems));
          },
        ),
      ],
    },
  },
};

export const Default = () => <ItemsList />;
