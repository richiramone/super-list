import styled from "styled-components";
import { useContext } from "react";
import { ListContext } from "../../contexts/ListContext";

type ConfirmItemButtonProps = {
  id: string;
};

const ConfirmItemButton = ({ id }: ConfirmItemButtonProps) => {
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

  const { confirmItem } = useContext(ListContext);

  return <Button onClick={() => confirmItem(id)}>tik</Button>;
};

export default ConfirmItemButton;
