import styled from 'styled-components';
import { useRef, useEffect, memo } from 'react';
import useStore from '../../Store/UseStore';

const AddItemStyles = styled.div`
  margin: 5rem 0.5rem 0;
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
    font-size: 18px;
    line-height: 1.2;
  }
`;

const AddItem: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(1);
  const hasRecentlyAddedItems = useRef(false);
  const addItem = useStore(state => state.addItem);

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

  const tryAddItem = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.currentTarget.value === '') {
      return;
    }

    hasRecentlyAddedItems.current = true;

    await addItem(event.currentTarget.value);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    inputRef.current!.value = '';
  };

  return (
    <AddItemStyles>
      <input onKeyPress={tryAddItem} ref={inputRef} type="text" placeholder="altro..." />
    </AddItemStyles>
  );
};

export default memo(AddItem);
