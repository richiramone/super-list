import styled from "styled-components";
import ReloadListButton from "../ReloadListButton/RefreshListButton";
import EmptyList from "../EmptyList/EmptyList";

const Header = () => {
  const Header = styled.header`
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

  return (
    <Header>
      <h1>SuperList</h1>
      <menu>
        <ReloadListButton />
        <EmptyList />
      </menu>
    </Header>
  );
};

export default Header;
