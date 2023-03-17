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
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);

  const confirmItem = async () => {
    await updateItem(id, value.replace('?', '')).then(() => {
      setNeedsRefresh(needsRefresh + 1);
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
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
      </svg>
    </button>
  );
};

export default memo(ConfirmItemButton);
