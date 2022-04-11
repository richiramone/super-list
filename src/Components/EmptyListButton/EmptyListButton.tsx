import styled from 'styled-components';
import { memo } from 'react';
import useStore from '../../Store/UseStore';

const EmptyListButtonStyles = styled.button`
  padding: 0;
  width: 26px;
  height: 26px;
  outline: none;
  border: none;
  background: none;
`;

const EmptyListButton: React.FC = () => {
  const emptyList = useStore(state => state.emptyList);
  const renderConfirmationDialog = useStore(state => state.renderConfirmationDialog);
  const confirmationDialogCancelAction = useStore(state => state.confirmationDialogCancelAction);

  const _emptyList = () => {
    emptyList();
    confirmationDialogCancelAction();
  };

  const _renderConfirmationDialog = () => {
    renderConfirmationDialog('Sei sicuro di voler svuotare la lista?', _emptyList);
  };

  return (
    <EmptyListButtonStyles onClick={() => _renderConfirmationDialog()}>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-trash"></use>
      </svg>
    </EmptyListButtonStyles>
  );
};

export default memo(EmptyListButton);
