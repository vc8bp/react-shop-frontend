import './app.css'
import React from "react";
import CartPage from "./pages/CartPage";
import { Routes, Route, Navigate, Outlet} 
from 'react-router-dom';
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import BackToTopBTN from '../src/components/BackToTopBTN'
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import ResetPassword from "./pages/ResetPassword";
import PaymentSuccess from "./pages/PaymentSuccess";
import MessageComponent from './components/MessageComponent';
import ScrollToTop from './components/ScrollToTop';
import OrdersPage from './pages/OrdersPage';

const IsNotLogin = () => {
  const user = useSelector(state => state.user?.currentUser);
  return !user ? <Outlet/> : <Navigate to={-1} /> //-1 means redirect to prev page
}


const App = () => {
  const user = useSelector(state => state.user?.currentUser);
  return (  
    <>
    <ScrollToTop/>
    <Routes>
      <Route element={<IsNotLogin/>}>
        <Route exact path="/login"  element={<Login title="Login"/>}/>
        <Route exact path="/signup"  element={<SingUp title="Sign up"/>}/>
        <Route exact path="/forgotpassword"  element={<ForgotPassword title="ForgotPassword"/>}/>       
      </Route>

      <Route exact path='/orders' element={<OrdersPage/>} />
      <Route exact path="/"  element={<Home title="Home" />}  />     
      <Route exact path="/Cart"  element={<CartPage title="Cart"/>}/>
      <Route exact path="/products/:category"  element={<ProductList title="Products"/>}/>
      <Route exact path="/product/:id"  element={<ProductPage title="Product"/>}/>
      <Route exact path="/forgotpassword"  element={<ForgotPassword title="ForgotPassword"/>}/>
      <Route exact path="/resetpassword/:token"  element={<ResetPassword title="ReseetPassword"/>}/>
      <Route exact path="/paymentSuccess"  element={<PaymentSuccess title="PaymentSuccess"/>}/>
    </Routes>
    <MessageComponent/>
    <BackToTopBTN/>  
    </>
  );
};

export default App;