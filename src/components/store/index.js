"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log(user);
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, user }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
