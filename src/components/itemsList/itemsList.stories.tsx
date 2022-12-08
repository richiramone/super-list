import React from 'react';
import ItemsList from './itemsList';
import { withJotai } from 'storybook-addon-jotai';
import mockedItems from '../../mocks/mockedExecute.json';
import { rest } from 'msw';

export default {
  title: 'Components/ItemsList',
  component: ItemsList,
  decorators: [withJotai],
};

const Template = () => <ItemsList />;
export const Default = Template.bind({});
Default.parameters = {
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
};
