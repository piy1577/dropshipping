import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleSignup, signup } from "../components/http_requests";
import { Input } from "./LoginForm";

const SignupForm = () => {
    const [input, setInput] = useState({ name: "", email: "", password: "" });
    const [show, setShow] = useState(false);
    const [error, setError] = useState({ name: "", email: "", password: "" });
    const dispatch = useDispatch();
    const redirect = useNavigate();
    return (
        <Col>
            <Form
                onSubmit={(e) => signup(e, input, setError, dispatch, redirect)}
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
                <Input
                    label={"Name"}
                    input={input.name}
                    type="text"
                    onInput={(e) =>
                        setInput((t) => {
                            return { ...t, name: e.target.value };
                        })
                    }
                />
                <Input
                    label={"Email"}
                    input={input.email}
                    type="email"
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
                        onSuccess={(credentialResponse) =>
                            googleSignup(credentialResponse, dispatch, redirect)
                        }
                    ></GoogleLogin>
                </GoogleOAuthProvider>
            </Row>
            <Row>
                <Button variant="link" className="mt-3">
                    Already a User? Login
                </Button>
            </Row>
        </Col>
    );
};

export default SignupForm;
