import { addDoc, collection } from "firebase/firestore";
import * as firebase from ".";

const handler = async (user, data) => {
    const collections = collection(firebase.db, "products");
    await addDoc(collections, { ...data, id: user.uid });
};

export default handler;
