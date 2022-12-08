import React from 'react';
import EmptyListButton from './emptyListButton';
import { rest } from 'msw';

export default {
  title: 'Components/EmptyListButton',
  component: EmptyListButton,
  parameters: {
    msw: {
      handlers: [
        rest.post(
          'https://aws.connect.psdb.cloud/psdb.v1alpha1.Database/Execute',
          (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json({}));
          },
        ),
      ],
    },
  },
};

export const Default = () => {
  return (
    <div
      className="bg-primary"
      style={{
        padding: '10px 4px',
        display: 'inline-block',
        borderRadius: '12px',
      }}
    >
      <EmptyListButton />
    </div>
  );
};
