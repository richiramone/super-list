import React from 'react';
import ConfirmationDialog from './confirmationDialog';

export default {
  title: 'Components/ConfirmationDialog',
  component: ConfirmationDialog,
};

export const Default = () => {
  return (
    <ConfirmationDialog
      question={'Sei sicuro di voler svuotare la lista?'}
      confirmCallback={() => {}}
      cancelCallback={() => {}}
    />
  );
};
