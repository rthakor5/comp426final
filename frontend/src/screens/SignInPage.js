import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// SCREEN FOR USERS TO SIGNIN AND IS WHERE USERS ARE REDIRECTED IF THEY ARE NOT SIGNED IN 

export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1]:'/';

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter email..." required 
                    onChange={e => setEmail(e.target.value)} autoComplete='on'></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password..." required 
                    onChange={e => setPassword(e.target.value)} autoComplete='on'></input>
                </div>
                <div>
                    <label/>
                    <button className='primary' type='submit'>Sign In</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Don't have an account? <Link to={`/register?redirect=${redirect}`}>Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
