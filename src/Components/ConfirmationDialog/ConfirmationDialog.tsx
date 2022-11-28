import { useAtom } from 'jotai';
import { memo, useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { confirmationDialogSettingsAtom } from '../../Atoms';
import { IConfirmationDialogSettings } from '../../Interfaces';
import { noop } from '../../Utilities';

const DialogStyles = `
    &:focus,
    &:active {
      box-shadow: 0 0 4px 0px #009dff;
    }
  }
`;

const EmptyListButton: React.FC = () => {
  const [settings, setSettings] = useAtom(confirmationDialogSettingsAtom);
  const okInputRef = useRef<HTMLButtonElement>(null);

  const ESCAPE_KEYS = ['27', 'Escape'];

  const escapehandler = (event: KeyboardEvent) => {
    if (ESCAPE_KEYS.includes(event.key)) {
      cancelAction();
    }
  };

  const resetSettings = () => {
    setSettings({
      shouldRender: false,
      question: '',
      cancelCallback: noop,
      confirmCallback: noop,
    });
  };

  const cancelAction = () => {
    settings.cancelCallback();
    resetSettings();
  };

  const confrimAction = () => {
    settings.confirmCallback();
    resetSettings();
  };

  useEffect(() => {
    if (settings.shouldRender) {
      window.addEventListener('keydown', escapehandler);
      okInputRef.current?.focus();
    } else {
      window.removeEventListener('keydown', escapehandler);
    }
  }, [settings.shouldRender]);

  return (
    <>
      {settings.shouldRender && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-modal">
          <FocusLock>
            <div className="absolute top-1/2 left-[calc(50%_-_160px)] w-80 rounded bg-white text-center text-black shadow-xl">
              <h3 className="m-0 pt-8 pr-4 pb-0 pl-0 text-xl font-normal leading-6">
                {settings.question}
              </h3>

              <div className="my-8 mx-0 flex justify-evenly">
                <button
                  className="h-auto w-36 rounded border border-solid border-cancel-button-border p-2 text-center text-base text-primary hover:shadow-lg hover:shadow-lg focus:shadow-primary focus:shadow-primary"
                  onClick={cancelAction}
                  type="button"
                >
                  No
                </button>

                <button
                  ref={okInputRef}
                  className="h-auto w-36 rounded border border-solid border-primary bg-primary p-2 text-center text-base text-white hover:shadow-lg hover:shadow-primary focus:shadow-primary focus:shadow-primary"
                  onClick={confrimAction}
                  type="button"
                >
                  Si
                </button>
              </div>
            </div>
          </FocusLock>
        </div>
      )}
    </>
  );
};

export default memo(EmptyListButton);
