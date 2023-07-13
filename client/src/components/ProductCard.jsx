// ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <h3>${product.price}</h3>
            <Link to={`/product/${product.id}`}>View Details</Link>
        </div>
    );
}

export default ProductCard;

// {image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80", title: "Headphone", description: "Best headphone at this price", price: 1500, id: 1}
