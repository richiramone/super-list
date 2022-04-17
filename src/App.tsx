import './App.css';
import Header from './Components/Header';
import styled from 'styled-components';
import useStore from './Store/UseStore';
import { useCallback, useEffect, lazy, Suspense } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from './Firebase/Auth';

const MainStyles = styled.main`
  margin-top: 60px;
`;

const App: React.FC = () => {
  const isAuthorLogged = useStore(useCallback(state => state.isAuthorLogged, []));
  const setUserEmail = useStore(state => state.setAuthor);

  const _logUser = async () => {
    const signInResult = await signInWithPopup(auth, googleAuthProvider);
    const userEmailFromResult = signInResult.user.email ? signInResult.user.email : '';

    setUserEmail(userEmailFromResult);
  };

  useEffect(() => {
    if (!isAuthorLogged) {
      _logUser();
    }
  }, []);

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
          {isAuthorLogged && (
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
