import { memo, useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';

export type ConfirmationDialogProps = {
  question: string;
  confirmCallback: () => void | Promise<void>;
  cancelCallback: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  question,
  confirmCallback,
  cancelCallback,
}: ConfirmationDialogProps) => {
  const okInputRef = useRef<HTMLButtonElement>(null);
  const ESCAPE_KEYS = ['27', 'Escape'];

  const escapehandler = (event: KeyboardEvent) => {
    if (ESCAPE_KEYS.includes(event.key)) {
      cancelAction();
    }
  };

  const removeEscapeListener = () => {
    window.removeEventListener('keydown', escapehandler);
  };

  const cancelAction = () => {
    removeEscapeListener;
    cancelCallback();
  };

  const confrimAction = async () => {
    removeEscapeListener;

    if (confirmCallback.constructor.name === 'AsyncFunction') {
      await confirmCallback();
      return;
    }

    confirmCallback();
  };

  useEffect(() => {
    window.addEventListener('keydown', escapehandler);
    okInputRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-modal"
      onClick={cancelAction}
    >
      <FocusLock>
        <div className="w-90 absolute top-[calc(50%_-_69px)] left-[calc(50%_-_167px)] rounded bg-white text-center text-black shadow-xl">
          <h3 className="m-0 pt-6 pr-4 pb-0 pl-4 text-xl font-normal leading-6">{question}</h3>

          <div className="mx-0 mt-8 mb-4 flex justify-evenly">
            <button
              className="h-auto w-36 rounded border border-solid border-cancel-button-border p-2 text-center text-base text-primary hover:shadow hover:shadow-gray-500 focus:shadow focus:shadow-gray-500"
              onClick={cancelAction}
              type="button"
            >
              No
            </button>

            <button
              ref={okInputRef}
              className="h-auto w-36 rounded border border-solid border-primary bg-primary p-2 text-center text-base text-white hover:shadow hover:shadow-gray-500 focus:shadow focus:shadow-gray-500"
              onClick={confrimAction}
              type="button"
            >
              Si
            </button>
          </div>
        </div>
      </FocusLock>
    </div>
  );
};

export default memo(ConfirmationDialog);
