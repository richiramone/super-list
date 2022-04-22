import './App.css';
import Header from './Components/Header';
import styled from 'styled-components';
import useStore from './Store/UseStore';
import { useCallback, lazy, Suspense } from 'react';
import LoginButton from './Components/LoginButton';

const AppStyles = styled.div`
  height: 100vh;

  section {
    margin-top: 5rem;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
      env(safe-area-inset-left);
  }
`;

const App: React.FC = () => {
  const isAuthorLogged = useStore(useCallback(state => state.isAuthorLogged, []));
  const renderLoader = () => <></>;
  const Preloader = lazy(() => import('./Components/Preloader'));
  const ConfirmationDialog = lazy(() => import('./Components/ConfirmationDialog'));
  const AddItem = lazy(() => import('./Components/AddItem'));
  const ItemsList = lazy(() => import('./Components/ItemsList'));

  return (
    <Suspense fallback={renderLoader()}>
      <AppStyles>
        <Preloader />
        <ConfirmationDialog />
        <Header />
        <section>
          {!isAuthorLogged ? (
            <LoginButton />
          ) : (
            <main>
              <aside>
                <AddItem />
              </aside>
              <ItemsList />
            </main>
          )}
        </section>
      </AppStyles>
    </Suspense>
  );
};

export default App;
