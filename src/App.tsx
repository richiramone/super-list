import './App.css';
import Header from './Components/Header';
import styled from 'styled-components';
import useStore from './Store/UseStore';
import { useCallback, lazy, Suspense } from 'react';
import LoginButton from './Components/LoginButton';
import React from 'react';

const AppStyles = styled.section`
  main {
    margin-top: 5rem;
    padding: 0 0.5rem;
    height: calc(100vh - 8rem);
  }
`;

const App: React.FC = () => {
  const isAuthorLogged = useStore(useCallback(state => state.isAuthorLogged, []));
  const setConnectionStatus = useStore(useCallback(state => state.setConnectionStatus, []));
  const renderLoader = () => <></>;
  const Preloader = lazy(() => import('./Components/Preloader'));
  const ConfirmationDialog = lazy(() => import('./Components/ConfirmationDialog'));
  const AddItem = lazy(() => import('./Components/AddItem'));
  const ItemsList = lazy(() => import('./Components/ItemsList'));

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
