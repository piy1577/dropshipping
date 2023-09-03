"use client";
import { Link } from "react-router-dom";
import { useState } from "react";
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
                <Link to="/">Home</Link>

                {user ? (
                    user.role === "buyer" ? (
                        <>
                            <Link to="/cart">Cart</Link>
                            <Link to="/profile">Profile</Link>
                        </>
                    ) : (
                        <>
                            {/* <Link to="/order">Orders</Link> */}
                            <Link to="/products">Products</Link>
                            <Link to="/profile">Profile</Link>
                        </>
                    )
                ) : (
                    <>
                        <Link id="signup" to="/signup">
                            SignUp
                        </Link>
                        <Link id="login" to="/login">
                            Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
