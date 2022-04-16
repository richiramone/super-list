import styled from 'styled-components';
import { memo, useCallback } from 'react';
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
  const isAuthorLogged = useStore(useCallback(state => state.isAuthorLogged, []));
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
    <>
      {isAuthorLogged && (
        <EmptyListButtonStyles onClick={() => _renderConfirmationDialog()}>
          <svg viewBox="0 0 32 32">
            <use xlinkHref="#shape-trash"></use>
          </svg>
        </EmptyListButtonStyles>
      )}
    </>
  );
};

export default memo(EmptyListButton);
