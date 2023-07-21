import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getProduct, paymentHandler } from "../components/http_requests";
import Cart_Data from "../components/Cart_Data";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [load, setLoad] = useState(false);
    const redirect = useNavigate();
    useEffect(() => {
        const f = async () => {
            setLoad(true);
            const data =
                (await Promise.all(Object.keys(cart).map(getProduct))) || [];
            setData(data);
            setLoad(false);

            let t = 0;
            if (data) {
                data.map(
                    (item, i) => (t += item.price * Object.values(cart)[i])
                );
            }
            setQuantity(t);
        };
        f();
    }, [cart]);

    return (
        <>
            {!load && (
                <>
                    <h1 style={{ textAlign: "center" }}>Cart</h1>
                    {data.map((item, i) => (
                        <Cart_Data key={i} index={i} data={item} cart={cart} />
                    ))}
                    {data.length === 0 && (
                        <h1
                            style={{
                                width: "100vw",
                                height: "60vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            Nothing to show
                        </h1>
                    )}
                    {data.length !== 0 && (
                        <div
                            className="d-grid gap-2 mb-3"
                            style={{ width: "95vw", margin: "auto" }}
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() =>
                                    paymentHandler(quantity, redirect)
                                }
                            >
                                Buy Now &#8377;{quantity}
                            </Button>
                        </div>
                    )}
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

export default Cart;
