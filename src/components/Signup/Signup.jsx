"use client";
import React, { useState } from "react";
import signup from "../firebase/Signup";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h2 className="signup">Signup</h2>
            <form onSubmit={(e) => signup(e, email, password)}>
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
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
