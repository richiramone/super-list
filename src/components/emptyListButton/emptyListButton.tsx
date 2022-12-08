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
        <svg viewBox="0 0 32 32">
          <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
          <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
        </svg>
      </button>
    </>
  );
};

export default memo(EmptyListButton);
