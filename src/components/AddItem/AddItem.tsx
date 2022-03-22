import styled from "styled-components";
import { useRef, useContext, useEffect, memo } from "react";
import { ListContext } from "../../contexts/ListContext";

const AddItem = () => {
  const AddItem = styled.div`
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

  const { addItem } = useContext(ListContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(1);
  const hasRecentlyAddedItems = useRef(false);

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

  const tryAddItem = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== "Enter" || event.currentTarget.value === "") {
      return;
    }

    hasRecentlyAddedItems.current = true;
    addItem(event.currentTarget.value);
  };

  return (
    <AddItem>
      <input
        onKeyPress={tryAddItem}
        ref={inputRef}
        type="text"
        placeholder="altro..."
      />
    </AddItem>
  );
};

export default memo(AddItem);
