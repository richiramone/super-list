import React from 'react';
import EmptyListButton from './emptyListButton';

export default {
  title: 'Components/EmptyListButton',
  component: EmptyListButton,
  argTypes: { onClick: { action: 'clicked' } },
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
