import { useAtom } from 'jotai';
import { memo } from 'react';
import { isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { deleteItem } from '../../server/db-client';
import { Button } from '@material-tailwind/react';

type DeleteItemButtonProps = {
  id: string;
};

const DeleteItemButton: React.FC<DeleteItemButtonProps> = ({ id }: DeleteItemButtonProps) => {
  const [isOnline] = useAtom(isOnlineAtom);
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);
  const disableClass = isOnline ? '' : 'opacity-50';

  const _deleteItem = async () => {
    await deleteItem(id).then(() => {
      setNeedsRefresh(needsRefresh + 1);
    });
  };

  return (
    <Button
      data-testid="deleteItemButton"
      className={`${disableClass} ml-4 h-auto w-auto bg-transparent p-0 shadow-none`}
      onClick={_deleteItem}
      disabled={!isOnline}
    >
      <svg className="h-4 w-4  text-gray-800" aria-hidden="true" fill="none" viewBox="0 0 14 14">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </Button>
  );
};

export default memo(DeleteItemButton);
