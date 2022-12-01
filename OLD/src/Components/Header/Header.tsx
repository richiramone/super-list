import { memo } from 'react';
import EmptyListButton from '../EmptyListButton';
import RefreshListButton from '../RefreshListButton';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-10 flex w-screen flex-wrap items-center justify-between bg-primary px-4 text-white">
      <h1 className="m-0 inline text-3xl font-bold leading-none">SuperList</h1>

      <menu className="m-0 py-0">
        <RefreshListButton />
        <EmptyListButton />
      </menu>
    </header>
  );
};

export default memo(Header);
