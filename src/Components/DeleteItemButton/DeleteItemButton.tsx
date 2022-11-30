import { useAtom } from 'jotai';
import { memo } from 'react';
import { isOnlineAtom } from '../../Atoms';
import { deleteItem } from '../../Server/Db/client';
import { isBeingDeletedAtom } from '../Item/Item';

type DeleteItemButtonProps = {
  id: string;
};

const DeleteItemButton: React.FC<{
  id: string;
}> = ({ id }: DeleteItemButtonProps) => {
  const [, setIsBeingDeleted] = useAtom(isBeingDeletedAtom);
  const [isOnline] = useAtom(isOnlineAtom);
  const disableClass = isOnline ? '' : 'opacity-50';

  const _deleteItem = async () => {
    setIsBeingDeleted(true);
    await deleteItem(id);
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
