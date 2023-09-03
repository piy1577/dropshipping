/* eslint-disable react/prop-types */
const ProductCard = ({ data }) => {
    return (
        <div className="card">
            <div className="image">
                <img src={data.image} alt={data.name} />
            </div>
            <div className="title">{data.name}</div>
            <div className="price"> &#x20B9;{data.price}</div>
        </div>
    );
};

export default ProductCard;
