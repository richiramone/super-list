import { useRef, useEffect, memo, useCallback } from 'react';
//import { hasDuplicatedValue } from '../../Utilities';

const AddItemStyles = `
  input {
    width: 100%;
    margin: 0;
    outline: none;
    border: 0;
    font-weight: normal;
    letter-spacing: 0.02em;
    line-height: 1.2;

    &:disabled {
      opacity: 0.5;
    }
  }
`;

const AddItemForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(1);
  const hasRecentlyAddedItems = useRef(false);
  // const items = useStore(useCallback(state => state.items, []));
  // const addItem = useStore(useCallback(state => state.addItem, []));
  // const renderConfirmationDialog = useStore(
  //   useCallback(state => state.renderConfirmationDialog, []),
  // );
  // const confirmationDialogCancelAction = useStore(
  //   useCallback(state => state.confirmationDialogCancelAction, []),
  // );
  // const shouldRender = useStore(useCallback(state => state.shouldRenderConfirmationDialog, []));
  const isOnline = true;

  useEffect(() => {
    if (renderCount.current < 3) {
      renderCount.current += 1;
      return;
    }

    if (hasRecentlyAddedItems.current) {
      inputRef.current?.focus();
      hasRecentlyAddedItems.current = false;
    }
  });

  // useEffect(() => {
  //   if (!shouldRender && renderCount.current > 2) {
  //     inputRef.current?.focus();
  //   }
  // }, [shouldRender]);

  const tryAddItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.currentTarget.value === '') {
      return;
    }

    const value = event.currentTarget.value;

    // if (hasDuplicatedValue(items, value)) {
    //   renderConfirmationDialog('Sembra che ci sia giá. Vuoi procedere?', async () => {
    //     confirmationDialogCancelAction();
    //     await _addItem(value);
    //   });
    // } else {
    //   _addItem(value);
    // }
  };

  // const _addItem = async (value: string) => {
  //   hasRecentlyAddedItems.current = true;

  //   await addItem(value);

  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   inputRef.current!.value = '';
  // };

  return (
    <form className="flex h-auto w-auto max-w-sm cursor-pointer rounded bg-primary py-1.5 px-2 transition-colors duration-200	ease-in-out">
      <input
        className="m-0 block w-full border-0 bg-transparent font-normal leading-5 tracking-wide text-white outline-none placeholder:italic placeholder:text-stone-200 disabled:opacity-50"
        data-add-item-input
        onKeyPress={tryAddItem}
        ref={inputRef}
        type="text"
        placeholder="altro..."
        disabled={!isOnline}
      />
    </form>
  );
};

export default memo(AddItemForm);
