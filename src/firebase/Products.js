import { collection, getDocs } from "firebase/firestore";
import * as firebase from ".";

const handler = async (set) => {
    const collectionRef = collection(firebase.db, "products");
    const dataSnapShot = await getDocs(collectionRef);
    let arr = [];
    dataSnapShot.forEach((item) => arr.push(item.data()));
    set(arr);
};

export default handler;
