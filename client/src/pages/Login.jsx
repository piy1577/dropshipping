import React, { useState } from "react";
import { FloatingLabel, Form, Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import svg from "../image/undraw_programming_re_kg9v.svg";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <Row style={{ marginTop: "10%" }}>
            <Col>
                <Form
                    style={{
                        width: "80%",
                        marginLeft: "10%",
                        height: "100%",
                    }}
                >
                    <h1 style={{ textAlign: "center" }}>Login</h1>
                    <FloatingLabel label="Email" className="mb-3">
                        <Form.Control type="email" placeholder=" " />
                    </FloatingLabel>
                    <FloatingLabel label="Password" className="mb-3">
                        <Form.Control type="password" placeholder=" " />
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Check label="Show Password" />
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
                    <Row>
                        <Button variant="outline-primary" className="mt-3">
                            <FcGoogle /> Sign in with Google
                        </Button>
                    </Row>
                    <Row>
                        <Button variant="link" className="mt-3">
                            New User? Create an Account
                        </Button>
                    </Row>
                </Form>
            </Col>
            <Col>
                <Image src={svg} thumbnail style={{ border: "none" }} />
            </Col>
        </Row>
    );
};

export default Login;
