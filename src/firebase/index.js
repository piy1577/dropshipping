import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import signUp from "./Signup";
import Login from "./Login";
import forgotPassword from "./forgotPassword";
import Fetch from "./FetchData";
import signOut from "./signOut";
import Cart from "./Cart";
import Order from "./Order";

// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId,
// };

const firebaseConfig = {
    apiKey: "AIzaSyB_dl2ibRli2LapaoIE_9UrFGS9eEAsxOc",
    authDomain: "connected-75f8a.firebaseapp.com",
    projectId: "connected-75f8a",
    storageBucket: "connected-75f8a.appspot.com",
    messagingSenderId: "809388333953",
    appId: "1:809388333953:web:1274a060578ed2e066a680",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    app,
    auth,
    db,
    signUp,
    Login,
    forgotPassword,
    Fetch,
    signOut,
    Cart,
    Order,
};
