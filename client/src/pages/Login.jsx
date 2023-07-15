import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import svg from "../image/undraw_programming_re_kg9v.svg";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState({ email: "", password: "" });
    const [show, setShow] = useState(false);
    const redirect = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });
            const response = await res.json();
            if (res.ok) {
                if (response.success) {
                    const date = new Date();
                    date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000);
                    document.cookie = `jwt=${response.token};expires=${date.toUTCString}`;
                    dispatch(authActions.login(response.user));
                    redirect("/");
                }
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
                    <h1 style={{ textAlign: "center" }}>Login</h1>
                    <Form.Text
                        style={{ color: "red", textTransform: "capitalize" }}
                    >
                        {error.email} {error.password}
                    </Form.Text>
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
                        <Col>
                            <Link>Forget Password</Link>
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
                                    "http://localhost:8000/google/login",
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
                                    document.cookie = `jwt=${response.token};expires=${date.toUTCString}`;
                                    dispatch(authActions.login(response.user));
                                    redirect("/");
                                } else {
                                    alert("login Failed");
                                }
                            }}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </GoogleOAuthProvider>
                </Row>
                <Row>
                    <Button
                        as={Link}
                        to="/signup"
                        variant="link"
                        className="mt-3"
                    >
                        New User? Create an Account
                    </Button>
                </Row>
            </Col>
            <Col>
                <Image src={svg} thumbnail style={{ border: "none" }} />
            </Col>
        </Row>
    );
};

export default Login;
