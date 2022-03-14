import ReloadListButton from "./ReloadListButton";
import EmptyListButton from "./EmptyListButton";

function Header() {
  return (
    <header className="App-header">
      <h1>SuperList</h1>
      <menu>
        <ReloadListButton />
        <EmptyListButton />
      </menu>
    </header>
  );
}

export default Header;
