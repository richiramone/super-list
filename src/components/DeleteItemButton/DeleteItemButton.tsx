import styled from "styled-components";
import { useContext, memo } from "react";
import { ItemContext } from "../../contexts/ItemContext";

type DeleteItemButtonProps = {
  id: string;
};

const DeleteItemButton = ({ id }: DeleteItemButtonProps) => {
  const Button = styled.button`
    margin-left: 1rem;
    padding: 0;
    width: auto;
    height: auto;

    svg {
      width: 20px;
      fill: #fff;
    }
  `;

  const { enableDeletedMode } = useContext(ItemContext);

  const _deleteItem = () => {
    enableDeletedMode();
    // deleteItem(id);
  };

  return (
    <Button onClick={_deleteItem}>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-trash"></use>
      </svg>
    </Button>
  );
};

export default memo(DeleteItemButton);
