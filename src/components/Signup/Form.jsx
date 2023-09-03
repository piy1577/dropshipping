import { useState } from "react";
import { useCart } from "../store";
import * as firebase from "../../firebase";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const router = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [Name, setName] = useState("");
    const [show, setShow] = useState(false);
    const { setUser } = useCart();

    return (
        <>
            <form
                onSubmit={(e) =>
                    firebase.signUp(
                        e,
                        {
                            email,
                            password,
                            phoneNumber,
                            name: Name,
                            role: "Buyer",
                        },
                        setUser,
                        router
                    )
                }
            >
                <h1>Register</h1>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email address"
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
                <button type="submit">Signup</button>
            </form>
        </>
    );
};

export default Form;
