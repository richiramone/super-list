import styled from "styled-components";
import { useContext } from "react";
import { ListContext } from "../contexts/ListContext";

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

type DeleteItemButtonProps = {
  id: string;
};

const DeleteItemButton = ({ id }: DeleteItemButtonProps) => {
  const { deleteItem } = useContext(ListContext);

  return (
    <Button onClick={() => deleteItem(id)}>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-trash"></use>
      </svg>
    </Button>
  );
};

export default DeleteItemButton;
