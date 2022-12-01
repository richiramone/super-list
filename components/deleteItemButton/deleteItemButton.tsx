import { useAtom } from 'jotai';
import { memo } from 'react';
import { isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { deleteItem } from '../../server/db-client';

type DeleteItemButtonProps = {
  id: string;
};

const DeleteItemButton: React.FC<{
  id: string;
}> = ({ id }: DeleteItemButtonProps) => {
  const [isOnline] = useAtom(isOnlineAtom);
  const [needRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);
  const disableClass = isOnline ? '' : 'opacity-50';

  const _deleteItem = async () => {
    await deleteItem(id).then(() => {
      setNeedsRefresh(needRefresh + 1);
    });
  };

  return (
    <button
      className={`${disableClass} ml-4 h-auto w-auto p-0`}
      onClick={_deleteItem}
      disabled={!isOnline}
    >
      <svg viewBox="0 0 32 32" className="w-5">
        <use xlinkHref="#shape-trash"></use>
      </svg>
    </button>
  );
};

export default memo(DeleteItemButton);
