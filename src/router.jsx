import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";

import Sale from "./pages/Sale";
import ProductCreate from "./pages/ProductCreate";
import Vouncher from "./pages/Vouncher";
import ProductEdit from "./pages/ProductEdit";
import VoucherDetail from "./pages/VoucherDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path:"/",
      
        errorElement:<NotFoundPage/>,
        children:[
            {
                index:true,
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"dashboard",
                element:<Layout/>,
                children:[
                    {
                        index:true,
                        element:<Dashboard/>
                    },
                    {
                       
                        path:"product",
                        element:<Product/>
                    },
                    {
                        path:"product/productCreate",
                        element:<ProductCreate/>
                    },
                    {
                        path:"product/:id",
                        element:<ProductEdit/>
                    },
                     {
                        path:"sale",
                        element:<Sale/>
                    },
                    {
                        path:"vouncher",
                        element:<Vouncher/>
                    },
                    {
                        path:"vouncher/voucherDetail/:id",
                        element:<VoucherDetail/>
                    }
                ]
            }
           
        ]
    }
])
export default router;