import React from 'react';
import ConfirmItemButton from './confirmItemButton';

export default {
  title: 'Components/ConfirmItemButton',
  component: ConfirmItemButton,
};

export const Default = () => {
  return (
    <div
      className="bg-primary"
      style={{
        padding: '10px 4px',
        width: '64px',
        display: 'inline-block',
        borderRadius: '12px',
      }}
    >
      <ConfirmItemButton id="2" value={''} />
    </div>
  );
};
