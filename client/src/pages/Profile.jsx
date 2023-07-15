import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    Form,
    InputGroup,
    FormGroup,
    FloatingLabel,
    Card,
} from "react-bootstrap";
import svg from "../image/undraw_profile_details_re_ch9r.svg";

const Profile = () => {
    const state = useSelector((state) => state);
    const [input, setInput] = useState({
        name: state.name,
        email: state.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const dispatch = useDispatch();
    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Row>
                            <Image
                                src={state.profileImage}
                                style={{
                                    borderRadius: "50%",
                                    height: "100px",
                                    margin: "auto",
                                    width: "120px",
                                }}
                            />
                        </Row>
                        <InputGroup className="my-3">
                            <InputGroup.Text>Name</InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={input.name}
                                onInput={(e) =>
                                    setInput((t) => {
                                        return { ...t, name: e.target.value };
                                    })
                                }
                            />
                            <Button
                                variant="outline-secondary"
                                id="button-addon2"
                            >
                                Change Name
                            </Button>
                        </InputGroup>

                        <InputGroup className="my-3">
                            <InputGroup.Text>Email</InputGroup.Text>
                            <Form.Control
                                type="Email"
                                value={input.email}
                                onInput={(e) =>
                                    setInput((t) => {
                                        return { ...t, email: e.target.value };
                                    })
                                }
                            />
                            <Button
                                variant="outline-secondary"
                                id="button-addon2"
                            >
                                Change Email
                            </Button>
                        </InputGroup>
                        <Card border="secondary" body>
                            <FormGroup>
                                <Form.Label>Change Password</Form.Label>
                                <FloatingLabel
                                    label="Current Password"
                                    className="mt-3"
                                >
                                    <Form.Control
                                        type="text"
                                        value={input.currentPassword}
                                        onInput={(e) =>
                                            setInput((t) => {
                                                return {
                                                    ...t,
                                                    currentPassword:
                                                        e.target.value,
                                                };
                                            })
                                        }
                                        placeholder=" "
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    label="New Password"
                                    className="mt-3"
                                >
                                    <Form.Control
                                        value={input.newPassword}
                                        onInput={(e) =>
                                            setInput((t) => {
                                                return {
                                                    ...t,
                                                    newPassword: e.target.value,
                                                };
                                            })
                                        }
                                        type="text"
                                        placeholder=" "
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    label="Confirm Password"
                                    className="mt-3"
                                >
                                    <Form.Control
                                        value={input.confirmPassword}
                                        onInput={(e) =>
                                            setInput((t) => {
                                                return {
                                                    ...t,
                                                    confirmPassword:
                                                        e.target.value,
                                                };
                                            })
                                        }
                                        type="text"
                                        placeholder=" "
                                    />
                                </FloatingLabel>
                                <Button
                                    variant="outline-secondary"
                                    className="mt-3"
                                >
                                    Submit
                                </Button>
                            </FormGroup>
                        </Card>
                    </Form>
                </Col>

                <Col>
                    <Image src={svg} />
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
