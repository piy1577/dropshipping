import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import svg from "../image/undraw_programming_re_kg9v.svg";
import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <Row style={{ marginTop: "10%" }}>
            <LoginForm />
            <Col>
                <Image src={svg} thumbnail style={{ border: "none" }} />
            </Col>
        </Row>
    );
};

export default Login;
