import { IFirebaseConfigurations } from '../Interfaces';

const firebaseConfigurations: IFirebaseConfigurations = {
  development: {
    apiKey: 'AIzaSyBpi2cEUjlcj8PfiI8xKHXCPA1DRdwT2I4',
    authDomain: 'super-9a549.firebaseapp.com',
    databaseURL: 'https://super-9a549-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'super-9a549',
    storageBucket: 'super-9a549.appspot.com',
    messagingSenderId: '274617340632',
    appId: '1:274617340632:web:832e8c2e020274bd383dad',
  },
  production: {
    apiKey: 'AIzaSyBUkmdKt_Qcqiow2mqLkcfVfCOOrYIyzkg',
    authDomain: 'super-list-prod.firebaseapp.com',
    databaseURL: 'https://super-list-prod-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'super-list-prod',
    storageBucket: 'super-list-prod.appspot.com',
    messagingSenderId: '304535713658',
    appId: '1:304535713658:web:49e253ae2a11ecfd3bc8c3',
  },
};

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const firebaseConfiguration = firebaseConfigurations[environment];

export default firebaseConfiguration;
