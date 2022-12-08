import React from 'react';
import AddItemForm from './addItemForm';
import { withJotai } from 'storybook-addon-jotai';
import { rest } from 'msw';

export default {
  title: 'Components/AddItemForm',
  component: AddItemForm,
  decorators: [withJotai],
};

const Template = () => {
  return <AddItemForm />;
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
