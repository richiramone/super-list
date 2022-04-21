import styled from 'styled-components';
import { memo } from 'react';
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
  const setUserEmail = useStore(state => state.setAuthor);

  const logUser = () => {
    _logUser();
  };

  const _logUser = async () => {
    const signInResult = await signInWithPopup(auth, googleAuthProvider);
    const userEmailFromResult = signInResult.user.email ? signInResult.user.email : '';

    setUserEmail(userEmailFromResult);
  };

  return <LoginButtonStyles onClick={logUser}>Login</LoginButtonStyles>;
};

export default memo(LoginButton);
