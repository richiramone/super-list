import styled from "styled-components";
import { useContext, useEffect, useRef, memo } from "react";
import { ItemContext } from "../../contexts/ItemContext";

type EditItemProps = {
  id: string;
  value: string;
};

const EditItemStyles = styled.input`
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

const EditItem: React.FC<{
  id: string;
  value: string;
}> = ({ id, value }: EditItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isBeingEdited: isEditing,
    enableEditingMode,
    disableEditingMode,
  } = useContext(ItemContext);

  const tryUpdateItem = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key !== "Enter" || event.currentTarget.value === "") {
      return;
    }

    disableEditingMode();
    // updateItem(id, event.currentTarget.value);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <EditItemStyles
      type="text"
      defaultValue={value}
      ref={inputRef}
      onKeyPress={tryUpdateItem}
      onClick={enableEditingMode}
    />
  );
};

export default memo(EditItem);
