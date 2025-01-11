 import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Orderrr/Order/Order";
import Login from "../components/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secure from "../pages/Secure/Secure";
import PrivateRoute from "./PrivateRoute";
import Card from "../pages/Dashboard/Card/Card";
import Dashboard from "../Layout/Dashboard";
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./Adminroute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
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
    {
        path:"dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // normal user routes
            {
                path:"cart",
                element:<Card></Card>    
            },
            // admin only route
            {
                path:"addItems",
                element:<AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path:"users",
                element:<AdminRoute><AllUser></AllUser></AdminRoute>
            },
            {
                path:"updateItem/:id", 
                element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
            {
                path:"manageItems",
                element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
            }
        ]    
    }
 ])