import { useAtom } from 'jotai';
import { memo, useState } from 'react';
import { isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { emptyList } from '../../server/db-client';
import ConfirmationDialog from '../confirmationDialog';

const EmptyListButton: React.FC = () => {
  const [isOnline] = useAtom(isOnlineAtom);
  const [needRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);
  const [isDialogHidden, setIsDialogHidden] = useState(true);

  const _emptyList = async () => {
    await emptyList().then(() => {
      setNeedsRefresh(needRefresh + 1);
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
          <use xlinkHref="#shape-trash"></use>
        </svg>
      </button>
    </>
  );
};

export default memo(EmptyListButton);
