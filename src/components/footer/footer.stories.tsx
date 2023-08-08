import React from 'react';
import Header from '../header';

export default {
  title: 'Components/Header',
  component: Header,
};

export const Default = () => {
  return (
    <div style={{ left: 0, position: 'fixed' }}>
      <Header />
    </div>
  );
};
