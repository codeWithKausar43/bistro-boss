 import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Orderrr/Order/Order";
import Login from "../components/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secure from "../pages/Secure/Secure";
import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"menu",
                element:<Menu></Menu>
            },
            {
                path:"order/:category", 
                element:<Order></Order>
            },
            {
                path:"login",
                element:<Login></Login>
            },
            {
                path:"signUp",
                element:<SignUp></SignUp>
            },
            {
                path:"secure",
                element:<PrivateRoute><Secure></Secure></PrivateRoute>
            }
        ]
    },
 ])