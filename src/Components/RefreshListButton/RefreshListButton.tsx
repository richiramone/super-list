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
`;

const RefreshListButton: React.FC = () => {
  const refreshItems = useStore(useCallback(state => state.refreshItems, []));

  const _refreshItems = async () => {
    await refreshItems(true);
  };

  return (
    <RefreshListButtonStyles onClick={_refreshItems}>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-reload"></use>
      </svg>
    </RefreshListButtonStyles>
  );
};

export default memo(RefreshListButton);
