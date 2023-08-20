import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const handleLogin = async (e, email, password) => {
    e.preventDefault();
    try {
        const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log(response.user);
    } catch (error) {
        console.error("Login Error:", error);
    }
};

export default handleLogin;
