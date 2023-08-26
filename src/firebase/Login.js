import { signInWithEmailAndPassword } from "firebase/auth";
import * as firebase from ".";
import { doc, getDoc } from "firebase/firestore";

const handler = async (e, { email, password }, set, router) => {
    e.preventDefault();
    try {
        const user = await signInWithEmailAndPassword(
            firebase.auth,
            email,
            password
        );
        const getData = await getDoc(doc(firebase.db, "users", user.user.uid));
        set({ ...user, ...getData });
        router.push("/");
    } catch (err) {
        console.log(err);
    }
};

export default handler;
