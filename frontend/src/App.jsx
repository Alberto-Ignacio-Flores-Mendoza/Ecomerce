import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavbarComp from './Components/NavbarComp';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useSelector, useDispatch } from 'react-redux';
import NewProduct from './Pages/NewProduct';
import ProductPage from './Pages/ProductPage';
import CategoryPage from './Pages/CategoryPage';
import ScrollToTop from './Components/ScrollToTop';
import CartPage from './Pages/CartPage';
import OrdersPage from './Pages/OrdersPage';
import AdminDashboard from './Pages/AdminDashboard';
import EditProductPage from './Pages/EditProductPage';
import { useEffect } from 'react';
import { addNotification } from './features/userSlice';
import { io } from "socket.io-client";

function App() {
const user= useSelector(state =>state.user)
const dispatch = useDispatch()
{/*socket code for notifications*/}
 useEffect(() => {
        const socket = io("ws://localhost:3000");
        socket.off("notification").on("notification", (msgObj, user_id) => {
            // logic for notification
            if (user_id === user._id) {
                dispatch(addNotification(msgObj));
            }
        });

        socket.off("new-order").on("new-order", (msgObj) => {
            if (user.isAdmin) {
                dispatch(addNotification(msgObj));
            }
        });
    }, []);


  return (
   <div className='App'>
    <BrowserRouter>
    <ScrollToTop></ScrollToTop>
      <NavbarComp></NavbarComp>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        {!user && (
          <>
          {/*We only want access to these pages if we arent logged in */}
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          </>

        )}

        {
          user && (
            <>
              <Route path="/cart" element={<CartPage></CartPage>}></Route>
              <Route path="/orders" element={<OrdersPage></OrdersPage>}></Route>

            </>
          )
        }

        {
          user && user.isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard></AdminDashboard>}></Route>
              <Route path="/products/:id/edit" element={<EditProductPage></EditProductPage>}></Route>

            </>
          )
        }
          <Route path="/products/:id" element={<ProductPage></ProductPage>}></Route>
          <Route path="/category/:category" element={<CategoryPage></CategoryPage>}></Route>

         <Route path="/new-product" element={<NewProduct></NewProduct>}></Route>
         <Route path="*" element={<Home></Home>}></Route>

        

      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
