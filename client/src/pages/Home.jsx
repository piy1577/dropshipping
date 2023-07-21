import React, { useEffect, useState } from "react";
import Carousel from "../components/carousel";
import { Form, Button, InputGroup, Container, Spinner } from "react-bootstrap";
import { homeLoader } from "../components/http_requests";

const Home = () => {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        homeLoader(setLoad, setData);
    }, []);

    return (
        <>
            {!load && (
                <>
                    <Container>
                        <InputGroup
                            className="d-flex"
                            style={{
                                textAlign: "center",
                                margin: "10px auto ",
                            }}
                        >
                            <Form.Control
                                type="text"
                                placeholder="&#x1F50D; search"
                            />
                            <Button variant="primary" id="button-addon2">
                                Search
                            </Button>
                        </InputGroup>
                    </Container>
                    <h1 style={{ textAlign: "center", fontSize: "50px" }}>
                        Products
                    </h1>
                    <Carousel data={data} />
                </>
            )}
            {load && (
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Spinner animation="border" role="status"></Spinner>
                    <span>Loading...</span>
                </div>
            )}
        </>
    );
};

export default Home;
