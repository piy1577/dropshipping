import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Cart, Login, Signup, Profile, ProductPage } from "./pages";
import Header from "./components/Header";
import CheckAuthorization from "./components/CheckAuthorization";
import PaymentSuccess from "./pages/PaymentSuccess";

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
            {
                path: "/paymentsuccess",
                element: <PaymentSuccess />,
            },
            {
                path: "/:id",
                element: (
                    <CheckAuthorization>
                        <ProductPage />
                    </CheckAuthorization>
                ),
            },
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
