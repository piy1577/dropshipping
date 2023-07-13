import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/product/:id", element: <ProductPage /> },
            { path: "/cart", element: <CartPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={Router} />;
}

export default App;
