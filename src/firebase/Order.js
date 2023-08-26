import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import * as firebase from ".";

const handler = async (user, item) => {
    const docRef = doc(firebase.db, "users", user.uid);
    await updateDoc(docRef, {
        cart: arrayRemove(item),
    });
};

export default handler;
