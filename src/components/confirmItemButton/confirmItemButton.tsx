import { useAtom } from 'jotai';
import { memo } from 'react';
import { isOnlineAtom, needsRefreshAtom } from '../../atoms';
import { updateItem } from '../../server/db-client';

type ConfirmItemButtonProps = {
  id: string;
  value: string;
};

const ConfirmItemButton: React.FC<{ id: string; value: string }> = ({
  id,
  value,
}: ConfirmItemButtonProps) => {
  const [isOnline] = useAtom(isOnlineAtom);
  const [needRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);

  const confirmItem = async () => {
    await updateItem(id, value.replace('?', '')).then(() => {
      setNeedsRefresh(needRefresh + 1);
    });
  };

  return (
    <button
      data-testid="confirmButton"
      className="ml-4 flex h-auto w-auto p-0"
      onClick={confirmItem}
      disabled={!isOnline}
    >
      <svg className="w-6" viewBox="0 0 24 24">
        <use xlinkHref="#confirm-icon"></use>
      </svg>
    </button>
  );
};

export default memo(ConfirmItemButton);
