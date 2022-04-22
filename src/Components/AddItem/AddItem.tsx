import styled from 'styled-components';
import { useRef, useEffect, memo } from 'react';
import useStore from '../../Store/UseStore';
import { hasDuplicatedValue } from '../../Utilities';

const AddItemStyles = styled.div`
  margin: 0 0.5rem 0;
  display: flex;
  padding: 0.3rem 0.5rem;
  max-width: 390px;
  width: auto;
  height: auto;
  border-radius: 4px;
  background: #09f;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  input {
    display: block;
    width: 100%;
    margin: 0;
    outline: none;
    border: 0;
    font-weight: normal;
    background: none;
    color: #fff;
    letter-spacing: 0.02em;
    line-height: 1.2;
  }
`;

const AddItem: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(1);
  const hasRecentlyAddedItems = useRef(false);
  const items = useStore(state => state.items);
  const addItem = useStore(state => state.addItem);
  const renderConfirmationDialog = useStore(state => state.renderConfirmationDialog);
  const confirmationDialogCancelAction = useStore(state => state.confirmationDialogCancelAction);
  const shouldRender = useStore(state => state.shouldRenderConfirmationDialog);

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

  useEffect(() => {
    if (!shouldRender && renderCount.current > 2) {
      inputRef.current?.focus();
    }
  }, [shouldRender]);

  const tryAddItem = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.currentTarget.value === '') {
      return;
    }

    const value = event.currentTarget.value;

    if (hasDuplicatedValue(items, value)) {
      renderConfirmationDialog('Sembra che ci sia giá. Vuoi procedere?', async () => {
        confirmationDialogCancelAction();
        await _addItem(value);
      });
    } else {
      _addItem(value);
    }
  };

  const _addItem = async (value: string) => {
    hasRecentlyAddedItems.current = true;

    await addItem(value);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    inputRef.current!.value = '';
  };

  return (
    <AddItemStyles>
      <input
        data-add-item-input
        onKeyPress={tryAddItem}
        ref={inputRef}
        type="text"
        placeholder="altro..."
      />
    </AddItemStyles>
  );
};

export default memo(AddItem);
