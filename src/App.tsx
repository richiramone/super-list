import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { authorAtom as _authorAtom, isOnlineAtom, needsRefreshAtom } from './atoms';
import UserSelector from './components/userSelector';
import Preloader from './components/preloader/preloader';
import ListRefresh from './components/listRefresh/listRefresh';
import AddItemForm from './components/addItemForm/addItemForm';
import ItemsList from './components/itemsList/itemsList';
import Menu from './components/menu/menu';

const App: React.FC = () => {
  const [, setConnectionStatus] = useAtom(isOnlineAtom);
  const [authorAtom] = useAtom(_authorAtom);
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      setNeedsRefresh(needsRefresh + 1);
    }
  });

  useEffect(() => {
    window.addEventListener('online', () => setConnectionStatus(true));
    window.addEventListener('offline', () => setConnectionStatus(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!authorAtom && (
        <>
          <UserSelector />
        </>
      )}
      {authorAtom && (
        <>
          <Preloader />

          <main>
            <ListRefresh />

            <aside>
              <AddItemForm />
            </aside>

            <ItemsList />
          </main>

          <Menu />
        </>
      )}
    </>
  );
};

export default App;
