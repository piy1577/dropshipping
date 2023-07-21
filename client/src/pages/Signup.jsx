import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import svg from "../image/undraw_sign_up_n6im.svg";
import SignupForm from "../components/SignupForm";

const Signup = () => {
    return (
        <Row style={{ marginTop: "10%" }}>
            <SignupForm />
            <Col>
                <Image src={svg} thumbnail style={{ border: "none" }} />
            </Col>
        </Row>
    );
};

export default Signup;
