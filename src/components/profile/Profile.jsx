"use client";
import React, { useState } from "react";
import SignOut from "../firebase/SignOut";
import { useCart } from "../store";
import changePassword from "../firebase/changePassword";
import profile from "../firebase/Profile";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

const Profile = () => {
    const { user } = useCart();
    const router = useRouter();

    const [firstInput, setFirstInput] = useState({
        name: user?.displayName || "",
        phoneNumber: user?.phoneNumber || 0,
    });

    const [passwords, setPasswords] = useState({ current: "", new: "" });

    return (
        <>
            <div className="profile">
                <div className="inputs">
                    <label>Name: </label>
                    <input
                        type="text"
                        value={firstInput.name}
                        onInput={(e) =>
                            setFirstInput((t) => {
                                return { ...t, name: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="button">
                    <button onClick={() => profile(firstInput)}>Submit</button>
                </div>
            </div>

            <div className="profile">
                <h3>Change Password</h3>
                <div className="inputs">
                    <label>Current Password: </label>
                    <input
                        type="text"
                        placeholder="Type your Current Password"
                        value={passwords.current}
                        onInput={(e) =>
                            setPasswords((t) => {
                                return { ...t, current: e.target.value };
                            })
                        }
                    />
                </div>

                <div className="inputs">
                    <label>New Password: </label>
                    <input
                        type="text"
                        placeholder="Type your New Password"
                        value={passwords.new}
                        onInput={(e) =>
                            setPasswords((t) => {
                                return { ...t, new: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="button">
                    <button
                        onClick={() =>
                            changePassword(auth.currentUser, passwords)
                        }
                    >
                        Change
                    </button>
                </div>
            </div>

            <button onClick={() => SignOut(router)}>Sign Out</button>
        </>
    );
};

export default Profile;
