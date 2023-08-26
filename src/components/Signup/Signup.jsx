"use client";
import React, { useState } from "react";
// import signup from "../firebase/Signup";
import * as firebase from "@/firebase";
import { useCart } from "../store";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [Name, setName] = useState("");
    const [role, setRole] = useState("");
    const { setUser } = useCart();
    return (
        <div>
            <h2 className="signup">Signup</h2>
            <form
                onSubmit={(e) =>
                    firebase.signUp(
                        e,
                        { email, password, phoneNumber, name: Name, role },
                        setUser
                    )
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
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option>Select the Role</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
