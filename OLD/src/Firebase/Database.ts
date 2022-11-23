import firebaseApp from '.';
import { DatabaseReference, getDatabase, ref } from 'firebase/database';

export const db = getDatabase(firebaseApp);

export const itemsDbRef: DatabaseReference = ref(db, 'items');
