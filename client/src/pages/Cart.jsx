import React from "react";
import { Card, CardGroup, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

const Cart = () => {
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Cart</h1>
            <Col className="d-flex flex-wrap">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </Col>
        </>
    );
};

export default Cart;
