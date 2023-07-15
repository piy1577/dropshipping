import React from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";

const Header = () => {
    const auth = useSelector((state) => state);
    const dispatch = useDispatch();
    return (
        <>
            <Navbar collapseOnSelect expand="lg">
                <Container fluid>
                    <Navbar.Brand>Drop Shipping</Navbar.Brand>
                    <Navbar.Toggle area-controls="navbarScroll" />
                    <Navbar.Collapse
                        id="navbarScroll"
                        className="justify-content-end"
                    >
                        <Nav>
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>

                            {!auth.isAuthenticated && (
                                <>
                                    <Nav.Link as={Link} to="/signup">
                                        Signup
                                    </Nav.Link>
                                    <Button as={Link} to="/login">
                                        Login
                                    </Button>
                                </>
                            )}
                            {auth.isAuthenticated && (
                                <>
                                    <Nav.Link as={Link} to="/cart">
                                        Cart
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => {
                                            const date = new Date();
                                            dispatch(authActions.logout());
                                            document.cookie = `jwt=""; expires=${date.toUTCString()}`;
                                        }}
                                    >
                                        Logout
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/profile">
                                        <img
                                            src={auth.profileImage}
                                            style={{
                                                width: "25px",
                                                height: "25px",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
};

export default Header;
