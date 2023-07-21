import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const search = useSearchParams()[0];
    const referenceNumber = search.get("reference");
    return (
        <Card style={{ width: "fit-content", margin: "auto", padding: "2rem" }}>
            <Card.Body>
                <Card.Title as={"h1"} style={{ textAlign: "center" }}>
                    Order Successful
                </Card.Title>
                <Card.Text>Reference id: {referenceNumber}</Card.Text>
                <Button variant="primary" as={Link} to={"/"}>
                    Buy More
                </Button>
            </Card.Body>
        </Card>
    );
};

export default PaymentSuccess;
