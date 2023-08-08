import { useAtom } from 'jotai';
import { memo, useState } from 'react';
import { isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { emptyList } from '../../server/db-client';
import ConfirmationDialog from '../confirmationDialog';

const EmptyListButton: React.FC = () => {
  const [isOnline] = useAtom(isOnlineAtom);
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);
  const [isDialogHidden, setIsDialogHidden] = useState(true);

  const _emptyList = async () => {
    await emptyList().then(() => {
      setNeedsRefresh(needsRefresh + 1);
      hideDialog();
    });
  };

  const hideDialog = () => {
    setIsDialogHidden(true);
  };

  const showDialog = () => {
    setIsDialogHidden(false);
  };

  return (
    <>
      {!isDialogHidden && (
        <ConfirmationDialog
          question={'Sei sicuro di voler svuotare la lista?'}
          confirmCallback={_emptyList}
          cancelCallback={hideDialog}
        />
      )}
      <button
        data-testid="emptyListButton"
        className="my-0 mx-5 h-7 w-7 border-none bg-transparent	p-0 outline-none disabled:opacity-50"
        type="button"
        onClick={showDialog}
        disabled={!isOnline}
      >
        <svg
          className="h-8 w-8 text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </>
  );
};

export default memo(EmptyListButton);
