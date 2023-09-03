"use client";
import { useEffect, useState } from "react";
import * as firebase from "../../firebase";
import { CartContext } from ".";

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    // const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            firebase.Fetch(user, setUser, setCartItems, setOrderItems);
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

    const orderDone = (item) => {
        setOrderItems((t) => {
            const index = t.indexOf(item);
            if (index > -1) {
                t.splice(index, 1);
            }
        });
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                orderDone,
                orderItems,
                user,
                setUser,
            }}
        >
            {!loading && <>{children}</>}
        </CartContext.Provider>
    );
};
