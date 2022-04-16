import './App.css';
import Preloader from './Components/Preloader';
import Header from './Components/Header';
import AddItem from './Components/AddItem';
import ItemsList from './Components/ItemList';
import styled from 'styled-components';
import ConfirmationDialog from './Components/ConfirmationDialog';
import useStore from './Store/UseStore';
import { useCallback, useEffect } from 'react';
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

  return (
    <>
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
    </>
  );
};

export default App;
