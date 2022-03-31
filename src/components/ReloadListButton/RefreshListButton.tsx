import styled from "styled-components";
import { memo } from "react";

const RefreshListButton = () => {
  const Button = styled.button`
    padding: 0;
    width: 26px;
    height: 26px;
    outline: none;
    border: none;
    background: none;
  `;

  const refreshList = (x: boolean) => {
    return x;
  };

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
