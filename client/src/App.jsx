import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
// import ProductPage from "./pages/ProductPage";
// import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            { index: true, element: <Home /> },
            //     { path: "/product/:id", element: <ProductPage /> },
            //     { path: "/cart", element: <CartPage /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={Router} />;
}

export default App;
