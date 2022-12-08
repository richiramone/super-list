import React from 'react';
import EmptyListButton from './emptyListButton';
import { withJotai } from 'storybook-addon-jotai';
import { rest } from 'msw';

export default {
  title: 'Components/EmptyListButton',
  component: EmptyListButton,
  decorators: [withJotai],
};

const Template = () => {
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
export const Default = Template.bind({});
Default.parameters = {
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
};
