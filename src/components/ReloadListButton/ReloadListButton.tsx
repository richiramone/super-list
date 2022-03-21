import styled from "styled-components";

const ReloadListButton = () => {
  const Button = styled.button`
    padding: 0;
    width: 26px;
    height: 26px;
    outline: none;
    border: none;
    background: none;
  `;

  function reloadList() {
    return;
  }

  return (
    <Button onClick={reloadList}>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-reload"></use>
      </svg>
    </Button>
  );
};

export default ReloadListButton;