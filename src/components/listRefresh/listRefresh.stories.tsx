import React from 'react';
import RefreshListButton from './listRefresh';

export default {
  title: 'Components/RefreshListButton',
  component: RefreshListButton,
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
      <RefreshListButton />
    </div>
  );
};
