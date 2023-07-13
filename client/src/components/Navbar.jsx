// Navbar.js
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <>
            <nav>
                <div className="container">
                    <h1>Dropshipping Website</h1>
                    <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                        <Link to="/cart">Cart</Link>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Navbar;
