// ProductPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
    const [product, setProduct] = useState(null);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <h3>${product.price}</h3>
            <button>Add to Cart</button>
        </div>
    );
}

export default ProductPage;
