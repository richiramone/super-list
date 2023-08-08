import { useAtom } from 'jotai';
import { memo } from 'react';
import { isLoadingAtom, isOnlineAtom, needsRefreshAtom } from '../../atoms';

const ListRefresh: React.FC = () => {
  const [needsRefresh, setNeedsRefreshAtom] = useAtom(needsRefreshAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [isOnline] = useAtom(isOnlineAtom);

  return (
    <button
      className="text-red my-0 mx-5 hidden h-7 w-7 border-none	bg-transparent p-0 outline-none disabled:opacity-50"
      type="button"
      onClick={() => {
        setIsLoading(true);
        setNeedsRefreshAtom(needsRefresh + 1);
      }}
      disabled={!isOnline}
      data-testid="refreshListButton"
    >
      <svg
        className="h-6 w-6 text-primary dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
        />
      </svg>
    </button>
  );
};

export default memo(ListRefresh);
