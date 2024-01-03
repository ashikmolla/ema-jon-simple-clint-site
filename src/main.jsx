import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './Components/Shop/Shop.jsx';
import HomeLeaout from './Components/HomeLeaout/HomeLeaout.jsx';
import Orders from './Components/Orders/Orders.jsx';
import Inventory from './Components/Inventory/Inventory.jsx';
import Login from './Components/Login/Login.jsx';
import CartProductLoder from './Loader/CartProductLoder.js';
import ChackOut from './Components/ChackOut/ChackOut.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import AutheProvider from './Provider/AutheProvider.jsx';
import PrivetRoutes from './Routes/PrivetRoutes.jsx';




const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLeaout />,
    children: [
      {
        path: '/',
        element: <Shop />,
        loader:()=>fetch('http://localhost:5000/totalProducts')
      },
      {
        path: 'orders',
        element: <Orders></Orders>,
        loader: CartProductLoder
      }, {
        path: 'inventory',
        element: <Inventory />

      }, {
        path: 'chackOut',
        element: <PrivetRoutes><ChackOut /></PrivetRoutes>
      }, {
        path: 'login',
        element: <Login />
      }, {
        path: 'signUp',
        element: <SignUp />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AutheProvider>
      <RouterProvider router={router} />
    </AutheProvider>
  </React.StrictMode>,
)
