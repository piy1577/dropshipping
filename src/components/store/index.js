"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };
    const removeFromCart = (item) => {
        setCartItems((t) => {
            const index = t.indexOf(item);
            if (index > -1) {
                t.splice(index, 1);
            }
            return t;
        });
    };
    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, user }}
        >
            {!loading && <>{children}</>}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
