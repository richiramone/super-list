import './App.css';
import Header from './Components/Header';
import styled from 'styled-components';
import useStore from './Store/UseStore';
import { useCallback, lazy, Suspense } from 'react';
import LoginButton from './Components/LoginButton';

const SectionStyles = styled.section`
  margin-top: 5rem;
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
        <Header />
        <SectionStyles>
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
        </SectionStyles>
      </div>
    </Suspense>
  );
};

export default App;
