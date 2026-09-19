import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../components/Home/Home";
import AllProducts from "../components/AllProducts/AllProducts";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import MyProducts from "../components/MyProducts/MyProducts";
import MyBids from "../components/MyBids/MyBids";
import CreateProducts from "../components/CreateProducts/CreateProducts";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import CreateAProduct from "../components/CreateAProduct/CreateAProduct";

const API_URL = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        hydrateFallbackElement: <p className="text-4xl text-gray-500 text-center mt-10">Loading.....</p>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/allProducts',
                loader: () => fetch(`${API_URL}/products`), 
                Component: AllProducts
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/myProducts',
                element: <PrivateRoutes><MyProducts></MyProducts></PrivateRoutes>
            },
            {
                path: '/myBids',
                element: <PrivateRoutes><MyBids></MyBids></PrivateRoutes>
            },
            {
                path: '/createProducts',
                element: <PrivateRoutes><CreateProducts></CreateProducts></PrivateRoutes>
            },
            {
                path: '/products/:id',
                loader: ({ params }) =>
                    fetch(`${API_URL}/products/${params.id}`),
                element: <PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>
            },
            {
                path: '/createAProduct',
                element: <PrivateRoutes><CreateAProduct></CreateAProduct></PrivateRoutes>
            },
            {
                path: "*",
                element: <Navigate to="/" replace />
            }
        ]
    },
]);

export default router