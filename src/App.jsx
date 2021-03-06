
import React from "react";
import CartPage from "./pages/CartPage";
import {
  Routes,
  Route, Navigate
} from 'react-router-dom';
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import BackToTopBTN from '../src/components/BackToTopBTN'
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import ResetPassword from "./pages/ResetPassword";


const App = () => {

  const user = useSelector(state => state.user.currentUser);

  return (
    
    <>
    <Routes>
      <Route exact path="/"  element={<Home title="Home" />}  />
      <Route exact path="/login"  element={ user ? <Navigate to='/'/> : <Login title="Login"/>}/>
      <Route exact path="/signup"  element={user ? <Navigate to='/'/> : <SingUp title="Sign up"/>}/>
      <Route exact path="/Cart"  element={<CartPage title="Cart"/>}/>
      <Route exact path="/products/:category"  element={<ProductList title="Products"/>}/>
      <Route exact path="/product/:id"  element={<ProductPage title="Product"/>}/>
      <Route exact path="/forgotpassword"  element={<ForgotPassword title="ForgotPassword"/>}/>
      <Route exact path="/resetpassword/:token"  element={<ResetPassword title="ReseetPassword"/>}/>
    </Routes>
    <BackToTopBTN/>  
    </>
  );
};

export default App;