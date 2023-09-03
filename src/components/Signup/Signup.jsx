/* eslint-disable no-unused-vars */
import Form from "./Form";
import { Link } from "react-router-dom";
import src from "../../images/Signup.svg";
import { useEffect, useState } from "react";

const Signup = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);
    return (
        <>
            <div className="signup">
                <div className="left">
                    <Form />
                    <div className="change">
                        Already a user? <Link to="/login">Login</Link>
                    </div>
                </div>
                {width > 800 && (
                    <div className="right">
                        <img src={src} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Signup;
