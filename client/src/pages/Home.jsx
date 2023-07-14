import React from "react";
import Carousel from "../components/carousel";
import { Form, Button } from "react-bootstrap";

const Home = () => {
    return (
        <>
            <Form
                style={{ textAlign: "center", margin: "10px" }}
                className="d-flex"
            >
                <Form.Control
                    type="search"
                    placeholder="&#x1F50D; search"
                    style={{ textAlign: "center", margin: " auto 10px" }}
                />
                <Button>Search</Button>
            </Form>
            <h1 style={{ textAlign: "center", fontSize: "50px" }}>Products</h1>
            <Carousel />;
        </>
    );
};

export default Home;
