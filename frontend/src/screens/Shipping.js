import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import {useDispatch, useSelector} from 'react-redux';
import { saveShippingInfo } from '../actions/cartActions';

// SCREEN WHERE USERS CAN ENTER THEIR SHIPPING ADDRESS -> DIRECTS TO PAYMENT SCREEN 

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const [lat, setLat] = useState(shippingAddress.lat);
    const [lng, setLng] = useState(shippingAddress.lng);
    const userAddressMap = useSelector((state) => state.userAddressMap);
    const { address: addressMap } = userAddressMap;
    if(!userInfo) {
        props.history.push('/sign-in');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [zipcode, setZipcode] = useState(shippingAddress.zipcode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (moveOn) {
      dispatch(
        saveShippingInfo({fullName,address,city,zipcode,country,lat: newLat,lng: newLng,})
      );
      props.history.push('/payment');
    }
  };
  const chooseOnMap = () => {
    dispatch(
        saveShippingInfo({fullName,address,city,zipcode,country,lat,lng,})
      );
      props.history.push('/map');
    };
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>
                        Shipping Address
                    </h1>
                </div>
                <div>
                    <label htmlFor="chooseOnMap">Location</label>
                    <button type="button" onClick={chooseOnMap}>
                        Click to select location
                    </button>
                </div>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input 
                        type='text'
                        id='fullName'
                        placeholder='Enter full name...'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input 
                        type='text'
                        id='address'
                        placeholder='Enter address...'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input 
                        type='text'
                        id='city'
                        placeholder='Enter city...'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor='zipcode'>Zip Code</label>
                    <input 
                        type='text'
                        id='zipcode'
                        placeholder='Enter zipcode...'
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input 
                        type='text'
                        id='country'
                        placeholder='Enter country...'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className='primary' type='submit'>Continue</button>
                </div>
            </form>
        </div>
    )
}
