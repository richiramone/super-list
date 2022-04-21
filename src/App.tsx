import './App.css';
import Header from './Components/Header';
import styled from 'styled-components';
import useStore from './Store/UseStore';
import { useCallback, lazy, Suspense } from 'react';
import LoginButton from './Components/LoginButton';

const MainStyles = styled.main`
  margin-top: 60px;
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
      <div className="App">
        <Preloader />
        <ConfirmationDialog />
        <section>
          <Header />
          {!isAuthorLogged ? (
            <LoginButton />
          ) : (
            <MainStyles>
              <aside>
                <AddItem />
              </aside>
              <ItemsList />
            </MainStyles>
          )}
        </section>
      </div>
    </Suspense>
  );
};

export default App;
