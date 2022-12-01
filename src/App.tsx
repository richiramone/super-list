import { useAtom } from 'jotai';
import { lazy, Suspense } from 'react';
import { isOnlineAtom } from './Atoms';
import './index.css';

const App: React.FC = () => {
  const [, setConnectionStatus] = useAtom(isOnlineAtom);
  window.addEventListener('online', () => setConnectionStatus(true));
  window.addEventListener('offline', () => setConnectionStatus(false));

  const Preloader = lazy(() => import('./Components/Preloader'));
  const Header = lazy(() => import('./Components/Header'));
  const AddItemForm = lazy(() => import('./Components/AddItemForm'));
  const ItemsList = lazy(() => import('./Components/ItemsList'));

  return (
    <Suspense>
      <section>
        <Preloader />
        <Header />

        <main>
          <aside>
            <AddItemForm />
          </aside>

          <ItemsList />
        </main>
      </section>
    </Suspense>
  );
};

export default App;
