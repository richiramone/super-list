import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import firebaseApp from '.';

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
