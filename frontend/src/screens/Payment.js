import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

// SCREEN WHERE USERS CAN SELECT WHICH PAYMENT METHOD (PAYPAL or GOOGLE PAY) THEY WANT TO CHOOSE 
// ONCE SELECTED THEY WILL BE DIRECTED TO THE CONFIRM AND PLACE ORDER SCREEN

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
// THIRD THIRD-PARTY API - GOOGLE PAY API TO ALLOW USER TO SIGN IN TO THEIR GOOGLE ACCOUNTS 
// AND PAY FOR THEIR ORDERS USING A CREDIT CARD. CURRENTLY IN TEST MODE NOT PRODUCTION SO USERS WILL NOT
// ACTUALLY BE CHARGED 
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Select Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input 
                             type='radio'
                             id='paypal'
                             value='PayPal'
                             name='paymentMethod'
                             required checked
                             onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor='paypal'>PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input 
                             type='radio'
                             id='googlepay'
                             value='Google Pay'
                             name='paymentMethod'
                             required 
                             onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor='googlepay'>Google Pay</label>
                    </div>
                </div>
                <div>
                    <button className='primary' type='submit'>Continue</button>
                </div>
            </form>
        </div>
    )
}
