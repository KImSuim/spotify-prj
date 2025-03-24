import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";

const fireStore = getFirestore(app);
export default fireStore;
