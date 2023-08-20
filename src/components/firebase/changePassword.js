import { auth } from ".";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";

const handler = async (user, input) => {
    try {
        const credential = await reauthenticateWithCredential(
            auth.currentUser,
            EmailAuthProvider.credential(user.email, input.current)
        );
        if (credential) {
            await updatePassword(auth.currentUser, input.new);
            alert("password changed");
        } else {
            throw new Error("Something went wrong");
        }
    } catch (err) {
        console.log(err.message);
        alert("Something went wrong", err.message);
    }
};

export default handler;
