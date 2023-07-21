import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { cartHandler, productLoader } from "../components/http_requests";

const ProductPage = () => {
    const cart = useSelector((state) => state.cart);
    const [data, setData] = useState({});
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        productLoader(id, setLoad, setData);
    }, []);

    return (
        <Row>
            {!load && (
                <>
                    <Col md={8}>
                        <Image
                            src={data.image}
                            width={"100%"}
                            style={{ margin: "auto" }}
                        />
                    </Col>
                    <Col md={4}>
                        <h1
                            style={{
                                textTransform: "uppercase",
                                textAlign: "center",
                                fontSize: "50px",
                                marginBottom: "2rem",
                            }}
                        >
                            {data.name}
                        </h1>
                        <p style={{ fontSize: "30px" }}>
                            <b>Price</b>:&nbsp;
                            <Badge
                                bg="secondary"
                                style={{ padding: 10, fontSize: "30px" }}
                                size="md"
                            >
                                &#8377; {data.price}
                            </Badge>
                        </p>
                        <p style={{ fontSize: "20px" }}>
                            <b>Description</b>: &nbsp; {data.description}
                        </p>
                        <div
                            className="d-grid gap-2 mx-auto"
                            style={{ margin: "auto", width: "90%" }}
                        >
                            <Button
                                size="md"
                                onClick={() => {
                                    dispatch(authActions.addToCard({ id }));
                                    cartHandler();
                                }}
                            >
                                Add to Cart
                            </Button>
                            <Button size="md">Buy Now</Button>
                        </div>
                    </Col>
                </>
            )}
            {load && <Col></Col>}
        </Row>
    );
};

export default ProductPage;
