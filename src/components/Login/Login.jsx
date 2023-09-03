import { useEffect, useState } from "react";
import { useCart } from "../store";
import * as firebase from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import src from "../../images/Signup.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useCart();
    const [show, setShow] = useState(false);
    const router = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);
    return (
        <div className="login">
            <div className="left">
                <form
                    onSubmit={(e) =>
                        firebase.Login(e, { email, password }, setUser, router)
                    }
                >
                    <h1>Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="check">
                        <input
                            type="checkbox"
                            checked={show}
                            onChange={() => setShow((t) => !t)}
                        />
                        <span> Show Password</span>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="change">
                    Create an account? <Link to="/signup">Signup</Link>
                </div>
            </div>
            {width > 800 && (
                <div className="right">
                    <img src={src} alt="no photo" />
                </div>
            )}
        </div>
    );
};

export default Login;
