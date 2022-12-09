import { useAtom } from 'jotai';
import { memo } from 'react';
import { isOnlineAtom } from '../../atoms';
import EmptyListButton from '../emptyListButton';
import RefreshListButton from '../refreshListButton';

export type HeaderProps = {
  hideButtons?: boolean;
};

const Header: React.FC<HeaderProps> = ({ hideButtons }: HeaderProps) => {
  const [isOnline] = useAtom(isOnlineAtom);
  const isOfflineClass = isOnline ? '' : 'opacity-50';

  return (
    <header
      data-testid="header"
      className="fixed top-0 z-10 flex w-screen flex-wrap items-center justify-between bg-primary px-4 text-white"
    >
      <h1 className={`${isOfflineClass} m-0 inline text-3xl font-bold leading-none`}>SuperList</h1>

      {!hideButtons && (
        <menu className="m-0 py-0">
          <RefreshListButton />
          <EmptyListButton />
        </menu>
      )}
    </header>
  );
};

export default memo(Header);
