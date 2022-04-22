import styled from 'styled-components';
import { memo, useCallback } from 'react';
import useStore from '../../Store/UseStore';

const CreateNewListButtonStyles = styled.button`
  padding: 0;
  width: 26px;
  height: 26px;
  outline: none;
  border: none;
  background: none;
`;

const CreateNewListButton: React.FC = () => {
  const isAuthorLogged = useStore(useCallback(state => state.isAuthorLogged, []));
  const createNewList = useStore(state => state.createNewList);
  const renderConfirmationDialog = useStore(state => state.renderConfirmationDialog);
  const confirmationDialogCancelAction = useStore(state => state.confirmationDialogCancelAction);

  const _createNewList = () => {
    createNewList();
    confirmationDialogCancelAction();
  };

  const _renderConfirmationDialog = () => {
    renderConfirmationDialog('Sei sicuro di voler creare una nuova lista?', _createNewList);
  };

  return (
    <>
      {isAuthorLogged && (
        <CreateNewListButtonStyles onClick={() => _renderConfirmationDialog()}>
          <svg viewBox="0 0 32 32">
            <use xlinkHref="#create-new-list"></use>
          </svg>
        </CreateNewListButtonStyles>
      )}
    </>
  );
};

export default memo(CreateNewListButton);
