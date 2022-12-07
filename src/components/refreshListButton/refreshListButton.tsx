import { useAtom } from 'jotai';
import { memo } from 'react';
import { isLoadingAtom, isOnlineAtom, needsRefreshAtom } from '../../atoms';

const RefreshListButton: React.FC = () => {
  const [needsRefresh, setNeedsRefreshAtom] = useAtom(needsRefreshAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [isOnline] = useAtom(isOnlineAtom);

  return (
    <button
      className="my-0 mx-5 h-7 w-7 border-none bg-transparent	p-0 outline-none disabled:opacity-50"
      type="button"
      onClick={() => {
        setIsLoading(true);
        setNeedsRefreshAtom(needsRefresh + 1);
      }}
      disabled={!isOnline}
      data-testid="refreshListButton"
    >
      <svg className="w-7" viewBox="0 0 1024 1024">
        <path d="M889.68 166.32c-93.608-102.216-228.154-166.32-377.68-166.32-282.77 0-512 229.23-512 512h96c0-229.75 186.25-416 416-416 123.020 0 233.542 53.418 309.696 138.306l-149.696 149.694h352v-352l-134.32 134.32z"></path>
        <path d="M928 512c0 229.75-186.25 416-416 416-123.020 0-233.542-53.418-309.694-138.306l149.694-149.694h-352v352l134.32-134.32c93.608 102.216 228.154 166.32 377.68 166.32 282.77 0 512-229.23 512-512h-96z"></path>
      </svg>
    </button>
  );
};

export default memo(RefreshListButton);
