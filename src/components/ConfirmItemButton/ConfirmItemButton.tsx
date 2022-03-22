import styled from "styled-components";
import { useContext } from "react";
import { ListContext } from "../../contexts/ListContext";

type ConfirmItemButtonProps = {
  id: string;
};

const ConfirmItemButton = ({ id }: ConfirmItemButtonProps) => {
  const Button = styled.button`
    display: flex;
    margin-left: 1rem;
    padding: 0;
    width: auto;
    height: auto;

    svg {
      width: 24px;
      fill: #fff;
    }
  `;

  const { confirmItem } = useContext(ListContext);

  return (
    <Button onClick={() => confirmItem(id)}>
      <svg viewBox="0 0 24 24">
        <use xlinkHref="#confirm-icon"></use>
      </svg>
    </Button>
  );
};

export default ConfirmItemButton;
