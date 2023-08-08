import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { lazy, Suspense } from 'react';
import { authorAtom as _authorAtom, isOnlineAtom, needsRefreshAtom } from './atoms';
import UserSelector from './components/userSelector';
import BasicItemsList from './components/basicItemsList/basicItemsList';

const App: React.FC = () => {
  const [, setConnectionStatus] = useAtom(isOnlineAtom);
  const [authorAtom] = useAtom(_authorAtom);
  const [needsRefresh, setNeedsRefresh] = useAtom(needsRefreshAtom);

  const Preloader = lazy(() => import('./components/preloader'));
  const ListRefresh = lazy(() => import('./components/listRefresh'));
  const Footer = lazy(() => import('./components/footer'));
  const AddItemForm = lazy(() => import('./components/addItemForm'));
  const ItemsList = lazy(() => import('./components/itemsList'));

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
    <Suspense>
      {!authorAtom && (
        <>
          <UserSelector />
        </>
      )}
      {authorAtom && (
        <>
          <Preloader />
          <ListRefresh />
          <main>
            <BasicItemsList />
            <aside>
              <AddItemForm />
            </aside>
            <ItemsList />
          </main>
          <Footer />
        </>
      )}
    </Suspense>
  );
};

export default App;
