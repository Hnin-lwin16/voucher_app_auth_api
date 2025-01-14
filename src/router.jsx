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
import UserProfile from "./pages/UserProfile";
import ChangeName from "./pages/ChangeName";
import ChangePassword from "./pages/ChangePassword";
import ChangePhoto from "./pages/ChangePhoto";

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
                        path:"vouchers",
                        element:<Vouncher/>
                    },
                    {
                        path:"vouchers/voucherDetail/:id",
                        element:<VoucherDetail/>
                    },
                    {
                        path:"userProfile",
                        children:[
                            {
                                index:true,
                                element:<UserProfile/>
                            },
                            {
                                path:"userChangeName",
                                element:<ChangeName/>
                            },
                            {
                                path:"userChangePassword",
                                element:<ChangePassword/>
                            },
                            {
                                path:"userChangePhoto",
                                element:<ChangePhoto/>
                            }
                        ]
                    }
                ]
            }
           
        ]
    }
])
export default router;