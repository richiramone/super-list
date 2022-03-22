import styled from "styled-components";
import { useState, useContext, memo } from "react";
import { ListContext } from "../../contexts/ListContext";

const Button = styled.button`
  padding: 0;
  width: 26px;
  height: 26px;
  outline: none;
  border: none;
  background: none;
`;

const Dialog = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  &.isActive {
    display: flex;
  }

  .confirmation-dialog {
    position: absolute;
    top: 50%;
    left: calc(50% - 160px);
    margin: -59px 0 0;
    width: 320px;
    border-radius: 4px;
    background: #fff;
    color: #333;
    box-shadow: 0 2px 5px #333;
    text-align: center;
  }

  h3 {
    margin: 0;
    padding: 2rem 1rem 0;
    font-size: 1.1rem;
    font-weight: normal;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: space-evenly;
    margin: 2rem 0;
  }

  button {
    padding: 0.5rem;
    width: 140px;
    height: auto;
    text-align: center;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid;

    &.cancel-button {
      color: #009dff;
      border-color: #009dff;
    }

    &.confirm-button {
      color: #fff;
      background: #009dff;
      border-color: #009dff;
    }

    &:focus,
    &:active {
      color: #fff;
      background: #0073d5;
    }
  }
`;

const EmptyList = () => {
  const [isActive, setState] = useState(false);
  const { emptyList } = useContext(ListContext);

  function _emptyList() {
    setState(isActive ? false : true);
    emptyList();
  }

  return (
    <span>
      <Dialog className={isActive ? "isActive" : ""}>
        <div className="confirmation-dialog">
          <h3>Sei sicuro di voler svuotare la lista?</h3>
          <div className="buttons-wrapper">
            <button
              className="cancel-button"
              onClick={() => setState(isActive ? false : true)}
            >
              No
            </button>

            <button className="confirm-button" onClick={_emptyList}>
              Si
            </button>
          </div>
        </div>
      </Dialog>

      <Button onClick={() => setState(isActive ? false : true)}>
        <svg viewBox="0 0 32 32">
          <use xlinkHref="#shape-trash"></use>
        </svg>
      </Button>
    </span>
  );
};

export default memo(EmptyList);
