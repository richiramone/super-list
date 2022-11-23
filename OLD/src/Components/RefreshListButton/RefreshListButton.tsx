import styled from 'styled-components';
import { memo, useCallback } from 'react';
import useStore from '../../Store/UseStore';

const RefreshListButtonStyles = styled.button`
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
  const isAuthorLogged = useStore(useCallback(state => state.isAuthorLogged, []));
  const refreshItems = useStore(useCallback(state => state.refreshItems, []));
  const isOnline = useStore(useCallback(state => state.isOnline, []));

  const _refreshItems = async () => {
    await refreshItems(true);
  };

  return (
    <>
      {isAuthorLogged && (
        <RefreshListButtonStyles onClick={_refreshItems} disabled={!isOnline}>
          <svg viewBox="0 0 32 32">
            <use xlinkHref="#shape-reload"></use>
          </svg>
        </RefreshListButtonStyles>
      )}
    </>
  );
};

export default memo(RefreshListButton);
