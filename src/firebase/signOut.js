import { signOut } from "firebase/auth";
import * as firebase from ".";

const handler = async (router) => {
    await signOut(firebase.auth);
    router.push("/");
};
export default handler;
