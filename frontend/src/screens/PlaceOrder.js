import React, {useEffect} from 'react'
import CheckoutSteps from '../components/CheckoutSteps';
import {useDispatch, useSelector} from 'react-redux';
import {createOrder} from '../actions/orderActions';
import { Link } from 'react-router-dom';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// CONFIRM AND PLACE SCREEN WHERE USER IS SUBMITTED AND IS DIRECTED TO THE ORDER PAGE 
// AND CAN PAY FOR THEIR ORDER

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart);
    if(!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    const roundPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = roundPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 35 ? roundPrice(0):roundPrice(8);
    cart.taxPrice = roundPrice(.0725 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
          props.history.push(`/order/${order._id}`);
          dispatch({ type: ORDER_CREATE_RESET });
        }
      }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>{cart.shippingAddress.fullName} <br/>
                                    <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                    {cart.zipcode}, {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <p><strong>Payment Method:</strong> {cart.paymentMethod}</p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Items</h2>
                                <ul>
                        {cart.cartItems.map((item) => (
                            <li key={item.product}> 
                                <div className='row'>
                                    <div>
                                        <img src={item.image} alt={item.name} className='small'></img>
                                    </div>
                                    <div className='min-30'>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        {item.qty} x ${item.price}: ${item.qty * item.price}
                                    </div>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Subtotal</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Total</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type='button' onClick={placeOrderHandler} className='primary block' disabled={cart.cartItems.length === 0}>Submit Order</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
