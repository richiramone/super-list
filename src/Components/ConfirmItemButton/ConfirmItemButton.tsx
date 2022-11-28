import { useAtom } from 'jotai';
import { memo } from 'react';
import { isOnlineAtom } from '../../Atoms';

type ConfirmItemButtonProps = {
  id: string;
};

const ConfirmItemButton = ({ id }: ConfirmItemButtonProps) => {
  const [isOnline] = useAtom(isOnlineAtom);
  const disableClass = isOnline ? '' : 'opacity-50';

  const _confirmItem = async () => {
    // await confirmItem(id);
  };

  return (
    <button
      className={`${disableClass} ml-4 flex h-auto w-auto p-0`}
      onClick={_confirmItem}
      disabled={!isOnline}
    >
      <svg className="w-6" viewBox="0 0 24 24">
        <use xlinkHref="#confirm-icon"></use>
      </svg>
    </button>
  );
};

export default memo(ConfirmItemButton);
``;
