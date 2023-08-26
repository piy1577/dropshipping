import { doc, updateDoc } from "firebase/firestore";
import * as firebase from ".";
const handler = async (user, cart) => {
    const db = doc(firebase.db, "users", user.uid);
    await updateDoc(db, { cart });
};

export default handler;
