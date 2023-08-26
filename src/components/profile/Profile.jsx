"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../store";
import { useRouter } from "next/navigation";
import { signOut } from "@/firebase";

const Profile = () => {
    const { user } = useCart();
    const router = useRouter();
    const [firstInput, setFirstInput] = useState({
        name: "",
        phoneNumber: 0,
        email: "",
    });

    useEffect(() => {
        if (user) {
            setFirstInput({
                name: user?.displayName,
                phoneNumber: user?.phoneNumber,
                email: user?.email,
            });
        }
    }, [user]);

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
                    <button>Submit</button>
                </div>
            </div>
            <div className="profile">
                <div className="inputs">
                    <label>Phone Number: </label>
                    <input
                        type="text"
                        value={firstInput.phoneNumber}
                        onInput={(e) =>
                            setFirstInput((t) => {
                                return { ...t, phoneNumber: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="button">
                    <button>Submit</button>
                </div>
            </div>
            <div className="profile">
                <div className="inputs">
                    <label>Name: </label>
                    <input
                        type="text"
                        value={firstInput.email}
                        onInput={(e) =>
                            setFirstInput((t) => {
                                return { ...t, email: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="button">
                    <button>Submit</button>
                </div>
            </div>

            <button onClick={() => signOut(router)}>Sign Out</button>
        </>
    );
};

export default Profile;
