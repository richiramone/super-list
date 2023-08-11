import React from 'react';
import Footer from '../footer';

export default {
  title: 'Components/Footer',
  component: Footer,
};

export const Default = () => {
  return (
    <div style={{ left: 0, position: 'fixed' }}>
      <Footer />
    </div>
  );
};
