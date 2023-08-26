import { doc, getDoc } from "firebase/firestore";
import * as firebase from ".";

const handler = async (user, set, setCart, setOrder) => {
    if (user) {
        const docSnap = await getDoc(doc(firebase.db, "users", user.uid));
        const data = docSnap.data();
        set({ ...user, ...data });
        setCart(user?.cart || []);
        setOrder(user?.orders || []);
    } else {
        set(null);
    }
};

export default handler;
