import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
import { redirect } from "react-router-dom";

const CheckAuthorization = ({ children, required = false }) => {
    const [loading, setLoading] = useState(false);
    const state = useSelector((state) => state.isAuthenticated);
    const dispatch = useDispatch();
    useEffect(() => {
        const f = async () => {
            setLoading(true);
            const cookie = document.cookie
                .split("; ")
                .find((row) => row.startsWith("jwt="))
                ?.split("=")[1];

            const res = await fetch("http://localhost:8000/isloggedin", {
                method: "POST",
                headers: {
                    Authorization: `bearer ${cookie}`,
                },
            });

            const response = await res.json();
            if (response.success) {
                dispatch(authActions.login(response.user));
            } else if (required) {
                redirect("/login");
            }
            setLoading(false);
        };
        if (!state) {
            f();
        }
    });
    return <>{!loading && children}</>;
};

export default CheckAuthorization;
