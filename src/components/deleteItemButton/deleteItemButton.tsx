import { useAtom } from 'jotai';
import { memo } from 'react';
import { isOnlineAtom } from '../../atoms';
import { deleteItem } from '../../server/db-client';
import { itemsAtom } from '../itemsList/itemsList';

type DeleteItemButtonProps = {
  id: string;
};

const DeleteItemButton: React.FC<{
  id: string;
}> = ({ id }: DeleteItemButtonProps) => {
  const [isOnline] = useAtom(isOnlineAtom);
  const [items, setItems] = useAtom(itemsAtom);
  const disableClass = isOnline ? '' : 'opacity-50';

  const setUpdatedItemsAfterDelete = (id: string) => {
    const updatedItems = items.filter(item => item.id.toString() !== id);
    setItems(updatedItems);
  };

  const _deleteItem = async () => {
    setUpdatedItemsAfterDelete(id);
    await deleteItem(id);
  };

  return (
    <button
      data-testid="deleteItemButton"
      className={`${disableClass} ml-4 h-auto w-auto p-0`}
      onClick={_deleteItem}
      disabled={!isOnline}
    >
      <svg className="h-4 w-4 text-gray-800" aria-hidden="true" fill="none" viewBox="0 0 14 14">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  );
};

export default memo(DeleteItemButton);
