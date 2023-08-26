"use client";
import React, { useState } from "react";
import { useCart } from "../store";
import * as firebase from "@/firebase";
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useCart();
    const router = useRouter();

    return (
        <div className="login">
            <h2>Login</h2>
            <form
                onSubmit={(e) =>
                    firebase.Login(e, { email, password }, setUser, router)
                }
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
