import Card from "./ProductCard";
import src from "../../images/12982910_5124557.svg";
const data = [
    {
        name: "Face Cream",
        image: "https://m.media-amazon.com/images/I/71HHfkWoEmL._AC_UF1000,1000_QL80_.jpg",
        price: 50,
    },
    {
        name: "Face wash",
        image: "https://images.mamaearth.in/catalog/product/h/o/honey-malai-face-wash1.jpg",
        price: 100,
    },
    {
        name: "body lotion",
        image: "https://www.jiomart.com/images/product/original/490003761/vaseline-intensive-care-deep-restore-body-lotion-100-ml-product-images-o490003761-p490003761-0-202306061919.jpg?im=Resize=(420,420)",
        price: 250,
    },
    {
        name: "Shampoo",
        image: "https://m.media-amazon.com/images/I/71enDA8w01L.jpg",
        price: 200,
    },
    {
        name: "Conditioner",
        image: "https://m.media-amazon.com/images/I/61eJ6nDmqTL.jpg",
        price: 500,
    },
];

const Home = () => {
    return (
        <div className="home">
            <div className="head">
                <div className="title">
                    <h2>Discover Your Beauty Essentials.</h2>
                    <h5>
                        Elevate Your Beauty Routine with High-Quality Cosmetic
                        Products.
                    </h5>
                </div>
                <div className="search">
                    <input
                        type="search"
                        placeholder=" &#x1F50D;search for product"
                    />
                </div>
            </div>
            <h1>Products</h1>
            <div className="filter">
                <select>
                    <option>Sort By</option>
                    <option>Price: High To Low</option>
                    <option>Price: Low to High</option>
                </select>
            </div>
            <div className="products">
                {data.map((item, i) => (
                    <Card data={item} key={i} />
                ))}
            </div>
            <h1>Contact Us</h1>
            <div className="contact">
                <div className="image">
                    <img src={src} />
                </div>
                <form className="form">
                    <div className="input">
                        <label>Name: </label>
                        <input type="text" />
                    </div>
                    <div className="input">
                        <label>Contact: </label>
                        <input type="text" />
                    </div>
                    <div className="input">
                        <label>Message: </label>
                        <textarea rows={3}></textarea>
                    </div>
                    <div className="btn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;
