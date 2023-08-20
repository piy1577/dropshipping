import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_dl2ibRli2LapaoIE_9UrFGS9eEAsxOc",
    authDomain: "connected-75f8a.firebaseapp.com",
    projectId: "connected-75f8a",
    storageBucket: "connected-75f8a.appspot.com",
    messagingSenderId: "809388333953",
    appId: "1:809388333953:web:1274a060578ed2e066a680",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
