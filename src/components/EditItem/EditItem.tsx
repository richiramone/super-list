import styled from "styled-components";
import { useContext, useEffect, useRef } from "react";
import { ListContext } from "../../contexts/ListContext";
import { ItemContext } from "../../contexts/ItemContext";

type EditItemProps = {
  id: string;
  value: string;
};

const EditItem = ({ id, value }: EditItemProps) => {
  const EditItem = styled.input`
    display: none;
    margin: 0;
    width: auto;
    background: none;
    border: 0;
    outline: none;
    font-size: 18px;
    font-weight: normal;
    line-height: 1.2;
    letter-spacing: 0.02em;
    color: #fff;
  `;

  const inputRef = useRef<HTMLInputElement>(null);
  const { updateItem } = useContext(ListContext);
  const { isEditing, enableEditingMode, disableEditingMode } =
    useContext(ItemContext);

  const tryUpdateItem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key !== "Enter" || event.currentTarget.value === "") {
      return;
    }

    disableEditingMode();
    updateItem(id, event.currentTarget.value);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <EditItem
      type="text"
      defaultValue={value}
      ref={inputRef}
      onKeyPress={tryUpdateItem}
      onClick={enableEditingMode}
    />
  );
};

export default EditItem;
