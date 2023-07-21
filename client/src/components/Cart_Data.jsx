import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { cartHandler } from "./http_requests";

const Cart_Data = ({ data, cart, index }) => {
    const dispatch = useDispatch();
    const totalPrice = Object.values(cart)[index] * data.price;

    return (
        <>
            <Col
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "start",
                    width: "100vw",
                    margin: "auto",
                }}
            >
                <Card
                    className="border-primary  p-3 m-3"
                    style={{ width: "100%" }}
                >
                    <Row>
                        <Col md={4}>
                            <Card.Img src={data.image} />
                        </Col>
                        <Col md={8}>
                            <Card.Header
                                style={{
                                    textTransform: "uppercase",
                                    fontSize: "25px",
                                }}
                                as={Link}
                                to={`/${data._id}`}
                            >
                                {data?.name}
                            </Card.Header>
                            <Card.Text style={{ margin: "20px auto" }}>
                                PRICE:&nbsp; &#8377;
                                {data.price}
                            </Card.Text>
                            <Card.Text>Total Cost: {totalPrice}</Card.Text>
                            <Card.Text>
                                Quantity:&nbsp;
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        dispatch(
                                            authActions.addToCard({
                                                id: data._id,
                                            })
                                        );
                                        cartHandler();
                                    }}
                                >
                                    +
                                </Button>
                                &nbsp;
                                {cart[Object.keys(cart)[index]]}
                                &nbsp;
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        dispatch(
                                            authActions.removeFromCart({
                                                id: data._id,
                                            })
                                        );
                                        cartHandler();
                                    }}
                                >
                                    -
                                </Button>
                            </Card.Text>
                            <Card.Text>
                                Description: {data.description}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </>
    );
};

export default Cart_Data;
