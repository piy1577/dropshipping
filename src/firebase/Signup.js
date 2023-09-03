import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from ".";
import { setDoc, doc } from "firebase/firestore";

const handler = async (e, input, router) => {
    e.preventDefault();
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            input.email,
            input.password
        );

        let options = {
            displayName: input.name,
            email: input.email,
            phoneNumber: input.phoneNumber,
            role: input.role,
        };

        if (input.role === "seller") {
            options = { ...options, orders: [] };
        } else {
            options = { ...options, cart: [] };
        }

        const docRef = doc(db, "users", user.user.uid);

        await setDoc(docRef, options);
        router("/");
    } catch (err) {
        console.error(err);
    }
};

export default handler;
