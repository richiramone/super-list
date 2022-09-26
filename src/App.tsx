import './App.css';
import Header from './components/Header';
import styled from 'styled-components';
import useStore from './Store/UseStore';
import { useCallback, lazy, Suspense } from 'react';
import LoginButton from './components/LoginButton';
import React from 'react';

const AppStyles = styled.section`
  main {
    margin-top: calc(5rem + env(safe-area-inset-top, 5rem));
    padding: 0 0.5rem;
  }
`;

const App: React.FC = () => {
  const isAuthorLogged = useStore(useCallback(state => state.isAuthorLogged, []));
  const setConnectionStatus = useStore(useCallback(state => state.setConnectionStatus, []));
  const renderLoader = () => <></>;
  const Preloader = lazy(() => import('./components/Preloader'));
  const ConfirmationDialog = lazy(() => import('./components/ConfirmationDialog'));
  const AddItem = lazy(() => import('./components/AddItem'));
  const ItemsList = lazy(() => import('./components/ItemsList'));

  window.addEventListener('online', () => setConnectionStatus(true));
  window.addEventListener('offline', () => setConnectionStatus(false));

  return (
    <Suspense fallback={renderLoader()}>
      <AppStyles>
        <Preloader />
        <ConfirmationDialog />
        <Header />
        <main>
          {!isAuthorLogged ? (
            <LoginButton />
          ) : (
            <>
              <aside>
                <AddItem />
              </aside>
              <ItemsList />
            </>
          )}
        </main>
      </AppStyles>
    </Suspense>
  );
};

export default App;
