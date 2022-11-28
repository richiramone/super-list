import { memo } from 'react';

const EmptyListButtonStyles = `
  padding: 0;
  width: 26px;
  height: 26px;
  outline: none;
  border: none;
  background: none;

  &:disabled {
    opacity: 0.5;
  }
`;

// const renderConfirmationDialog = (text: string) => {
//   confirmationDialogSettings.question = 'Sembra che ci sia giá. Vuoi continuare?';
//   confirmationDialogSettings.confirmCallback = async () => {
//     await addItem(text);
//   };
//   confirmationDialogSettings.shouldRender = true;
// };

const EmptyListButton: React.FC = () => {
  // const emptyList = useStore(state => state.emptyList);
  // const renderConfirmationDialog = useStore(state => state.renderConfirmationDialog);
  // const confirmationDialogCancelAction = useStore(state => state.confirmationDialogCancelAction);
  // const isOnline = useStore(useCallback(state => state.isOnline, []));
  const isOnline = true;

  // const _emptyList = () => {
  //   emptyList();
  //   confirmationDialogCancelAction();
  // };

  const renderConfirmationDialog = () => {
    // renderConfirmationDialog('Sei sicuro di voler svuotare la lista?', _emptyList);
  };

  return (
    <button
      className="my-0 mx-5 h-7 w-7 border-none bg-transparent	p-0 outline-none disabled:opacity-50"
      type="button"
      onClick={() => renderConfirmationDialog()}
      disabled={!isOnline}
    >
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-trash"></use>
      </svg>
    </button>
  );
};

export default memo(EmptyListButton);
