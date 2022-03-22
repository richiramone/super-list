import styled from "styled-components";
import { useContext, memo } from "react";
import { ListContext } from "../../contexts/ListContext";

const RefreshListButton = () => {
  const Button = styled.button`
    padding: 0;
    width: 26px;
    height: 26px;
    outline: none;
    border: none;
    background: none;
  `;

  const { refreshList } = useContext(ListContext);

  return (
    <Button
      onClick={() => {
        refreshList(true);
      }}
    >
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-reload"></use>
      </svg>
    </Button>
  );
};

export default memo(RefreshListButton);
