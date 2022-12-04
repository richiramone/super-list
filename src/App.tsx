import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { lazy, Suspense } from 'react';
import { authorAtom, isOnlineAtom } from './atoms';
import UserSelector from './components/userSelector';

const App: React.FC = () => {
  const [, setConnectionStatus] = useAtom(isOnlineAtom);
  const [author] = useAtom(authorAtom);
  const savedAuthor = localStorage.getItem('author');

  const [authorState, setAuthorState] = useState(savedAuthor);

  const Preloader = lazy(() => import('./components/preloader'));
  const Header = lazy(() => import('./components/header'));
  const AddItemForm = lazy(() => import('./components/addItemForm'));
  const ItemsList = lazy(() => import('./components/itemsList'));

  useEffect(() => {
    if (!authorState) {
      setAuthorState(author);
    }

    // eslint-disable-next-line ``react-hooks/exhaustive-deps
  }, [author]);

  useEffect(() => {
    window.addEventListener('online', () => setConnectionStatus(true));
    window.addEventListener('offline', () => setConnectionStatus(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense>
      {!authorState && (
        <>
          <Header hideButtons={true} />
          <UserSelector />
        </>
      )}
      {authorState && (
        <>
          <Preloader />
          <Header />
          <main>
            <aside>
              <AddItemForm />
            </aside>
            <ItemsList />
          </main>
        </>
      )}
    </Suspense>
  );
};

export default App;
