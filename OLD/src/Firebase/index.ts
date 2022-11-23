import { FirebaseApp, initializeApp } from 'firebase/app';
import firebaseConfiguration from './Config';

const firebaseApp: FirebaseApp = initializeApp(firebaseConfiguration);

export default firebaseApp;
