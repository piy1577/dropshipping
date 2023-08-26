"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineStorage } from "react-icons/md";
import { useCart } from "../store";

const Header = () => {
    const [show, setShow] = useState(true);
    const { user } = useCart();

    return (
        <div className="header">
            <div className="main">
                <h1>Dropshipping</h1>
                <div className="show">
                    <MdOutlineStorage onClick={() => setShow((t) => !t)} />
                </div>
            </div>
            <div
                className="Links"
                style={show ? { display: "flex" } : { display: "none" }}
            >
                <Link href="/">Home</Link>

                {user ? (
                    user.role === "buyer" ? (
                        <>
                            <Link href="/cart">Cart</Link>
                            <Link href="/profile">Profile</Link>
                        </>
                    ) : (   
                        <>
                            <Link href="/order">Orders</Link>
                            <Link href="/products">Products</Link>
                            <Link href="/profile">Profile</Link>
                        </>
                    )
                ) : (
                    <>
                        <Link href="/signup">SignUp</Link>
                        <Link href="/login">Login</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
