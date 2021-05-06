import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from "redux-thunk";
import { cartReducer } from './reducers/cartReducers';
import {orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer,} from './reducers/orderReducers';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/productReducers';
import { userAddressMapReducer, userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/userReducer';

// COMBINATION OF REDUCERS FOR USERS, PRODUCTS, AND ORDERS THAT MAKES UP THE STORE INTERFACE
// USED TO INITIALIZE SCREENS AND DISPLAY THEM ON WEBSITE 
// ESSENTIALLY SETS A START STATE AND CHANGES STATE AS USER INTERACTS WITH FRONTEND

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress') 
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'PayPal',
    },
};

// REDUCERS LIST 
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderMineList: orderMineListReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDetails: userDetailsReducer,
    userAddressMap: userAddressMapReducer,
});


// REDUX DEV TOOLS TO SEE USER ACTIONS IN WEB CONSOLE 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;