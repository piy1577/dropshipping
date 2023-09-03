import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import * as pages from "./components";

const Router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <pages.Header />
                <Outlet />
                <pages.Footer />
            </>
        ),
        children: [
            { index: true, element: <pages.Home /> },
            { path: "/signup", element: <pages.Signup /> },
            { path: "/login", element: <pages.Login /> },
            { path: "/profile", element: <pages.Profile /> },
            { path: "/cart", element: <pages.Cart /> },
            { path: "/products" },
        ],
    },
]);

function App() {
    return (
        <pages.Provider>
            <RouterProvider router={Router} />
        </pages.Provider>
    );
}

export default App;
