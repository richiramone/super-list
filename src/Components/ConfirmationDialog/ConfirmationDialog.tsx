import { memo, useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';

const DialogStyles = `
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
      border-color: #008ce3;
    }

    &.confirm-button {
      color: #fff;
      background: #009dff;
      border-color: #009dff;
    }

    &:focus,
    &:active {
      box-shadow: 0 0 4px 0px #009dff;
    }
  }
`;

const EmptyListButton: React.FC = () => {
  const shouldRender = useStore(state => state.shouldRenderConfirmationDialog);
  const question = useStore(state => state.confirmationDialogQuestion);
  const cancelAction = useStore(state => state.confirmationDialogCancelAction);
  const confirmnAction = useStore(state => state.confirmationDialogCallbackFn);
  const okInputRef = useRef<HTMLButtonElement>(null);

  const ESCAPE_KEYS = ['27', 'Escape'];

  const escapehandler = (event: KeyboardEvent) => {
    if (ESCAPE_KEYS.includes(event.key)) {
      cancelAction();
    }
  };

  useEffect(() => {
    if (shouldRender) {
      window.addEventListener('keydown', escapehandler);
      okInputRef.current?.focus();
    } else {
      window.removeEventListener('keydown', escapehandler);
    }
  }, [shouldRender]);

  return (
    <div className={shouldRender ? 'isActive' : ''}>
      <FocusLock>
        <div className="confirmation-dialog">
          <h3>{question}</h3>
          <div className="buttons-wrapper">
            <button className="cancel-button" onClick={cancelAction}>
              No
            </button>

            <button ref={okInputRef} className="confirm-button" onClick={confirmnAction}>
              Si
            </button>
          </div>
        </div>
      </FocusLock>
    </div>
  );
};

export default memo(EmptyListButton);
