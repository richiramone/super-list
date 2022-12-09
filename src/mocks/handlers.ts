import { rest } from 'msw';
import mock from './mockedExecute.json';

export const handlers = [
  rest.post(
    'https://eu-west.connect.psdb.cloud/psdb.v1alpha1.Database/Execute',
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mock));
    },
  ),
];
