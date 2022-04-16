import styled from 'styled-components';
import { memo } from 'react';
import useStore from '../../Store/UseStore';

const DialogStyles = styled.div`
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
    font-size: 1.2rem;
    font-weight: normal;
    line-height: 1.5rem;
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

const EmptyListButton: React.FC = () => {
  const shouldRender = useStore(state => state.shouldRenderConfirmationDialog);
  const question = useStore(state => state.confirmationDialogQuestion);
  const cancelAction = useStore(state => state.confirmationDialogCancelAction);
  const confirmnAction = useStore(state => state.confirmationDialogCallbackFn);

  return (
    <DialogStyles className={shouldRender ? 'isActive' : ''}>
      <div className="confirmation-dialog">
        <h3>{question}</h3>
        <div className="buttons-wrapper">
          <button className="cancel-button" onClick={cancelAction}>
            No
          </button>

          <button className="confirm-button" onClick={confirmnAction}>
            Si
          </button>
        </div>
      </div>
    </DialogStyles>
  );
};

export default memo(EmptyListButton);