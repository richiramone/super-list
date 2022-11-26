import { memo, useCallback } from 'react';

const CreateNewListButton: React.FC = () => {
  // const createNewList = useStore(state => state.createNewList);
  // const renderConfirmationDialog = useStore(state => state.renderConfirmationDialog);
  // const confirmationDialogCancelAction = useStore(state => state.confirmationDialogCancelAction);
  const isOnline = true;

  const _createNewList = () => {
    // createNewList();
    // confirmationDialogCancelAction();
  };

  const _renderConfirmationDialog = () => {
    // renderConfirmationDialog('Sei sicuro di voler creare una nuova lista?', _createNewList);
  };

  return (
    <button
      className="my-0 mx-5 h-7 w-7 border-none bg-transparent	p-0 outline-none disabled:opacity-50"
      onClick={() => _renderConfirmationDialog()}
      disabled={!isOnline}
    >
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#create-new-list"></use>
      </svg>
    </button>
  );
};

export default memo(CreateNewListButton);
