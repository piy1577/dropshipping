// HomePage.js
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

function HomePage() {
    const [products, setProducts] = useState([
        {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
            title: "Headphone",
            description: "Best headphone at this price",
            price: 1500,
            id: 1,
        },
        {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
            title: "Headphone",
            description: "Best headphone at this price",
            price: 1500,
            id: 1,
        },
        {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
            title: "Headphone",
            description: "Best headphone at this price",
            price: 1500,
            id: 1,
        },
        {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
            title: "Headphone",
            description: "Best headphone at this price",
            price: 1500,
            id: 1,
        },
    ]);
    return (
        <div>
            <h1>Dropshipping Website</h1>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
