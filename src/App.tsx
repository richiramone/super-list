import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { lazy, Suspense } from 'react';
import { authorAtom, isOnlineAtom } from './atoms';
import { getAuthor } from './utilities';

const App: React.FC = () => {
  const [, setConnectionStatus] = useAtom(isOnlineAtom);
  const [, setAuthorAtom] = useAtom(authorAtom);

  const Preloader = lazy(() => import('./components/preloader'));
  const Header = lazy(() => import('./components/header'));
  const AddItemForm = lazy(() => import('./components/addItemForm'));
  const ItemsList = lazy(() => import('./components/itemsList'));

  useEffect(() => {
    setAuthorAtom(getAuthor());
    window.addEventListener('online', () => setConnectionStatus(true));
    window.addEventListener('offline', () => setConnectionStatus(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense>
      <Preloader />
      <Header />
      <main>
        <aside>
          <AddItemForm />
        </aside>
        <ItemsList />
      </main>
    </Suspense>
  );
};

export default App;
