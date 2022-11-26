import { memo, useCallback } from 'react';

const RefreshListButton: React.FC = () => {
  // const refreshItems = useStore(useCallback(state => state.refreshItems, []));
  const isOnline = true; //useStore(useCallback(state => state.isOnline, []));

  const _refreshItems = async () => {
    // await refreshItems(true);
  };

  return (
    <button
      className="my-0 mx-5 h-7 w-7 border-none bg-transparent	p-0 outline-none disabled:opacity-50"
      type="button"
      onClick={_refreshItems}
      disabled={!isOnline}
    >
      <svg className="w-7" viewBox="0 0 32 32">
        <use xlinkHref="#shape-reload"></use>
      </svg>
    </button>
  );
};

export default memo(RefreshListButton);
