import { memo, useCallback } from 'react';

const RefreshListButtonStyles = `
  padding: 0;
  width: 26px;
  height: 26px;
  outline: none;
  border: none;
  background: none;

  &:disabled {
    opacity: 0.5;
  }
`;

const RefreshListButton: React.FC = () => {
  // const refreshItems = useStore(useCallback(state => state.refreshItems, []));
  const isOnline = true; //useStore(useCallback(state => state.isOnline, []));

  const _refreshItems = async () => {
    // await refreshItems(true);
  };

  return (
    <button type='button' onClick={_refreshItems} disabled={!isOnline}>
      refresh list <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-reload"></use>
      </svg>
    </button>
  );
};

export default memo(RefreshListButton);
