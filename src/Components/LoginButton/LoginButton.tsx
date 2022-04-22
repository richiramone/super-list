import styled from 'styled-components';
import { memo, useCallback, useState } from 'react';
import useStore from '../../Store/UseStore';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../Firebase/Auth';

const LoginButtonStyles = styled.button`
  margin: 250px auto 0;
  display: flex;
  padding: 1rem 2rem;
  max-width: 390px;
  width: auto;
  height: auto;
  border-radius: 4px;
  background: #09f;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  font-weight: bold;
  font-size: 1.35rem;

  &:hover,
  &:active {
    background-color: #20a6ff;
  }
`;

const LoginButton: React.FC = () => {
  const [shouldBeHidden, setShouldBeHidden] = useState(false);
  const setIsFetching = useStore(useCallback(state => state.setIsFetching, []));
  const setUserEmail = useStore(useCallback(state => state.setAuthor, []));

  const logUser = () => {
    _logUser();
  };

  const _logUser = async () => {
    setShouldBeHidden(true);
    setIsFetching(true);

    const signInResult = await signInWithPopup(auth, googleAuthProvider);
    const userEmailFromResult = signInResult.user.email ? signInResult.user.email : '';

    setUserEmail(userEmailFromResult);
  };

  return (
    <LoginButtonStyles hidden={shouldBeHidden} onClick={logUser}>
      Login
    </LoginButtonStyles>
  );
};

export default memo(LoginButton);
