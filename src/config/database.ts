import firebaseApp from "./firebase";
import { DatabaseReference, getDatabase, ref } from "firebase/database";

export const db = getDatabase(firebaseApp);

export const dbRef: DatabaseReference = ref(db);
