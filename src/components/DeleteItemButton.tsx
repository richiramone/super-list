import styled from "styled-components";

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

function DeleteItemButton() {
  return (
    <Button>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-trash"></use>
      </svg>
    </Button>
  );
}

export default DeleteItemButton;
