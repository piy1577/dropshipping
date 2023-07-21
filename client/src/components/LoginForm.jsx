import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogin, login } from "../components/http_requests";
import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const Input = ({ label, input, onInput, type }) => {
    return (
        <FloatingLabel label={label} className="mb-3">
            <Form.Control
                value={input}
                onInput={onInput}
                type={type}
                placeholder=" "
            />
        </FloatingLabel>
    );
};

const LoginForm = () => {
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState({ email: "", password: "" });
    const [show, setShow] = useState(false);
    const redirect = useNavigate();
    const dispatch = useDispatch();

    return (
        <Col>
            <Form
                onSubmit={(e) => login(e, input, setError, dispatch, redirect)}
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
                <Input
                    label={"Email"}
                    input={input.email}
                    type={"email"}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, email: e.target.value };
                        })
                    }
                />
                <Input
                    label={"Password"}
                    input={input.password}
                    type={show ? "text" : "password"}
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, password: e.target.value };
                        })
                    }
                />
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
                <GoogleOAuthProvider
                    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                >
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            googleLogin(credentialResponse, dispatch, redirect);
                        }}
                    />
                </GoogleOAuthProvider>
            </Row>
            <Row>
                <Button as={Link} to="/signup" variant="link" className="mt-3">
                    New User? Create an Account
                </Button>
            </Row>
        </Col>
    );
};

export default LoginForm;
