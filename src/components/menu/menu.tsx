import { memo } from 'react';
import EmptyListButton from '../emptyListButton';
import AddItemFromList from '../addItemFromList/addItemFromList';
import { isOnlineAtom } from '../../atoms';
import { useAtom } from 'jotai';

const Menu: React.FC = () => {
  const [isOnline] = useAtom(isOnlineAtom);
  const isOfflineClass = isOnline ? '' : 'opacity-50';

  return (
    <menu
      data-testid="menu"
      className={`${isOfflineClass} fixed bottom-4 right-2 z-10 flex w-screen justify-end md:bottom-10`}
    >
      <AddItemFromList />
      <EmptyListButton />
    </menu>
  );
};

export default memo(Menu);
