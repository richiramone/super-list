import { memo } from 'react';
import CreateNewListButton from '../CreateNewListButton';
import EmptyListButton from '../EmptyListButton';
import RefreshListButton from '../RefreshListButton';

const Header: React.FC = () => {
  return (
    <header className="z-100 fixed top-0 flex h-14 w-screen flex-wrap items-center justify-between bg-primary px-4 text-white">
      <h1 className="m-0 inline text-3xl font-bold leading-none">SuperList</h1>

      <menu className="m-0 py-0">
        <CreateNewListButton />
        <RefreshListButton />
        <EmptyListButton />
      </menu>
    </header>
  );
};

export default memo(Header);
