import React from "react";
import { Navbar, Container, Form, Button, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg"    >
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
                            <Nav.Link as={Link} to="/cart">
                                Cart
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                Signup
                            </Nav.Link>
                            <Button as={Link} to="/login">
                                Login
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
};

export default Header;
