import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

// HOMEPAGE FOR SIGNIN AND REGISTRATION IF ACCOUNT HAS NOT YET BEEN CREATED 
// ONCE USER CREATES AN ACCOUNT AND SIGNS IN THEY WILL BE REDIRECTED TO THE
// SHOP WHERE THEY CAN BROWSE BOOK SELECTIONS AND PRODUCT INFORMATION 

export default function HomeScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;
  if(!userInfo) {
    props.history.push('/sign-in');
  }
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
    return (
      <div>
        {loading? (
          <LoadingBox></LoadingBox>
        ) : error? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className = "row center"> 
            {products.map(product => (
              <Product key={product._id} product={product}></Product>
            ))}
         </div>
        )}
      </div>
    )
}
