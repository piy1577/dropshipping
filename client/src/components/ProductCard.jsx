import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);
    return (
        <Card
            border="secondary"
            style={
                width > 350
                    ? { width: "300px", margin: "10px auto" }
                    : { width: "240px", margin: "10px auto" }
            }
        >
            <Card.Img variant="top" src={data.image} />
            <Card.Body>
                <Card.Title style={{ textTransform: "uppercase" }}>
                    {data.name}
                </Card.Title>
                <Badge
                    bg={"secondary"}
                    style={{
                        padding: "0.5rem",
                        margin: "10px 0px",
                        fontSize: "16px",
                    }}
                >
                    &#8377;&nbsp;{data.price}
                </Badge>
                <br />
                <Button as={Link} to={`/${data._id}`} variant="primary">
                    See product
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
