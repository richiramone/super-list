import styled from 'styled-components';
import ReloadListButton from '../RefreshListButton/RefreshListButton';
import EmptyList from '../EmptyListButton/EmptyListButton';
import { memo, useCallback } from 'react';
import useStore from '../../Store/UseStore';
import CreateNewListButton from '../CreateNewListButton';

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  width: 100vw;
  height: 60px;
  border-top: 0 solid #009dff;
  border-top-width: env(safe-area-inset-top, 0);

  background: #009dff;

  h1 {
    display: inline;
    margin: 0;
    font-size: 28px;
    line-height: 1;
  }

  menu {
    margin: 0;
    padding: 0 24px;
  }

  button {
    margin: 0 12px;
  }

  svg {
    width: 26px;
  }
`;

const Header: React.FC = () => {
  const isAuthorLogged = useStore(useCallback(state => state.isAuthorLogged, []));

  return (
    <HeaderStyles>
      <h1>SuperList</h1>
      {isAuthorLogged && (
        <menu>
          <CreateNewListButton />
          <ReloadListButton />
          <EmptyList />
        </menu>
      )}
    </HeaderStyles>
  );
};

export default memo(Header);
