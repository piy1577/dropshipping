import React, { useState } from "react";
import { FloatingLabel, Form, Button, Row, Col, Image } from "react-bootstrap";
import svg from "../image/undraw_sign_up_n6im.svg";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [input, setInput] = useState({ name: "", email: "", password: "" });
    const [show, setShow] = useState(false);
    const [error, setError] = useState({ name: "", email: "", password: "" });

    const dispatch = useDispatch();
    const redirect = useNavigate();
    const submitHandler = async (e) => {
        setError({ name: "", email: "", password: "" });
        e.preventDefault();
        if (input.name.trim().length === 0) {
            setError((t) => {
                return { ...t, name: "Name is required" };
            });
            return;
        }
        if (input.email.trim().length === 0) {
            setError((t) => {
                return { ...t, email: "email is required" };
            });
        }
        if (input.password.length < 6) {
            setError((t) => {
                return {
                    ...t,
                    password: "Password should contain more than 6 character",
                };
            });
            return;
        }
        try {
            const res = await fetch("http://localhost:8000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });
            const response = await res.json();
            if (response.success) {
                const date = new Date();
                date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
                document.cookie = `jwt=${
                    response.token
                };expires=${date.toUTCString()}`;
                dispatch(authActions.login(response.user));
                redirect("/");
            } else {
                setError(response.error);
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Row style={{ marginTop: "10%" }}>
            <Col>
                <Form
                    onSubmit={submitHandler}
                    style={{
                        width: "80%",
                        marginLeft: "10%",
                    }}
                >
                    <h1 style={{ textAlign: "center" }}>Signup</h1>
                    <Form.Text>
                        {error.name}
                        {error.email}
                        {error.password}
                    </Form.Text>
                    <FloatingLabel label="Name" className="mb-3">
                        <Form.Control
                            type="text"
                            value={input.name}
                            onInput={(e) =>
                                setInput((t) => {
                                    return { ...t, name: e.target.value };
                                })
                            }
                            placeholder=" "
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Email" className="mb-3">
                        <Form.Control
                            value={input.email}
                            onInput={(e) =>
                                setInput((t) => {
                                    return { ...t, email: e.target.value };
                                })
                            }
                            type="email"
                            placeholder=" "
                        />
                    </FloatingLabel>
                    <FloatingLabel label="Password" className="mb-3">
                        <Form.Control
                            value={input.password}
                            onInput={(e) =>
                                setInput((t) => {
                                    return { ...t, password: e.target.value };
                                })
                            }
                            type={show ? "text" : "password"}
                            placeholder=" "
                        />
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Check
                                    checked={show}
                                    onChange={() => setShow((t) => !t)}
                                    label="Show Password"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Row>
                </Form>
                <Row
                    style={{
                        width: "181px",
                        margin: "20px auto",
                    }}
                >
                    <GoogleOAuthProvider clientId="809388333953-mp4ic4ssmigroi4aa1oi98opm2u0cgjt.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                const res = await fetch(
                                    "http://localhost:8000/google/signup",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${credentialResponse.credential}`,
                                        },
                                    }
                                );
                                const response = await res.json();
                                if (response.success) {
                                    const date = new Date();
                                    date.setTime(
                                        date.getTime() + 3 * 24 * 60 * 60 * 1000
                                    );
                                    document.cookie = `jwt=${
                                        response.token
                                    };expires=${date.toUTCString()}`;
                                    dispatch(authActions.login(response.user));
                                    redirect("/");
                                } else {
                                    alert("signup Failed");
                                }
                            }}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        ></GoogleLogin>
                    </GoogleOAuthProvider>
                </Row>
                <Row>
                    <Button variant="link" className="mt-3">
                        Already a User? Login
                    </Button>
                </Row>
            </Col>
            <Col>
                <Image src={svg} thumbnail style={{ border: "none" }} />
            </Col>
        </Row>
    );
};

export default Signup;
