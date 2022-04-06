import styled from 'styled-components';
import { memo } from 'react';

const RefreshListButtonStyles = styled.button`
  padding: 0;
  width: 26px;
  height: 26px;
  outline: none;
  border: none;
  background: none;
`;

const RefreshListButton: React.FC = () => {
  const refreshItems = async () => {
    // dispatch(await refreshList());
  };

  return (
    <RefreshListButtonStyles onClick={refreshItems}>
      <svg viewBox="0 0 32 32">
        <use xlinkHref="#shape-reload"></use>
      </svg>
    </RefreshListButtonStyles>
  );
};

export default memo(RefreshListButton);
