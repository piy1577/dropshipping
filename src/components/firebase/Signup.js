import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const handleSignup = async (e, email, password) => {
    e.preventDefault();
    try {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log(response.user);
    } catch (error) {
        console.error("Signup Error:", error.message);
    }
};

export default handleSignup;
