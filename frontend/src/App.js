import './index.css';
import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/Home';
import ProductScreen from './screens/ProductInfo';
import CartScreen from './screens/Cart';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SignInPage';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/Registration';
import ShippingAddressScreen from './screens/Shipping';
import PaymentMethodScreen from './screens/Payment';
import PlaceOrderScreen from './screens/PlaceOrder';
import OrderScreen from './screens/OrderPage';
import Admin from './components/admin';
import Productss from './screens/Productss';
import EditProducts from './screens/EditProducts';
import PastOrder from './screens/PastOrders';
import UserProfile from './screens/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import AddressMap from './screens/AddressMap';


// REACT APP FOR LOCAL HOSTING
// FILE CONSISTS OF PRIVATE/ADMIN ROUTES & INDIVIDUAL ROUTES TO THE SCREENS/PAGES WITHIN THE WEB APP 

function App() {
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to='/'>Stellar Bookshop</Link>
        </div>
        <div>
          </div>
        <div>
          {
            userInfo ? (
              <div className='dropdown'>
              <Link to='#'>{userInfo.name} <i className='fa fa-caret-down'></i></Link>
              <ul className='dropdown-content'>
              <li>
                    <Link to="/profile">Your Account</Link>
              </li>
              <li>
                <Link to="/orderhistory">Order History</Link>
              </li>
              <li>
                <Link to='#signout' onClick={signoutHandler}>Sign out</Link>
              </li>
              </ul>
              </div>
            ) : (
              <Link to="/sign-in">Sign In</Link>
            )
          }
          <Link to="/cart">
          Cart
          {(
            <span className='badge'>({cartItems.length})</span>
          )}
          </Link>
          {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                </ul>
              </div>
            )}
        </div>
      </header>
      <main>
        <Route path='/cart/:id?' component={CartScreen}></Route>
        <Route path='/product/:id' component={ProductScreen} exact></Route>
        <Route path="/product/:id/edit" component={EditProducts} exact></Route>
        <Route path='/sign-in' component={SigninScreen}></Route>
        <Route path='/register' component={RegisterScreen}></Route>
        <Route path='/shipping' component={ShippingAddressScreen}></Route>
        <Route path='/payment' component={PaymentMethodScreen}></Route>
        <Route path='/placeorder' component={PlaceOrderScreen}></Route>
        <Route path='/order/:id' component={OrderScreen}></Route>
        <Route path="/orderhistory" component={PastOrder}></Route>
        <PrivateRoute path="/profile" component={UserProfile}></PrivateRoute>
        <PrivateRoute path="/map" component={AddressMap}></PrivateRoute>
        <Admin path="/productlist" component={Productss}></Admin>
        <Route path='/' component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">COMP 426 Project</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
