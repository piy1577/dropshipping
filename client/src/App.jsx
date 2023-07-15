import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
// import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CheckAuthorization from "./components/CheckAuthorization";
import Profile from "./pages/Profile";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            {
                index: true,
                element: (
                    <CheckAuthorization>
                        <Home />
                    </CheckAuthorization>
                ),
            },
            //     { path: "/product/:id", element: <ProductPage /> },
            {
                path: "/cart",
                element: (
                    <CheckAuthorization required={true}>
                        <Cart />
                    </CheckAuthorization>
                ),
            },
            {
                path: "/profile",
                element: (
                    <CheckAuthorization required={true}>
                        <Profile />
                    </CheckAuthorization>
                ),
            },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={Router} />;
}

export default App;
