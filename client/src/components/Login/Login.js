import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';



const Login = ({ login }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username: { value: username }, password: { value: password } } = e.target;
        login(username, password);
        e.target.reset();
    }

    return (
        <main className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
                <label 
                    className='login__label' 
                    htmlFor='username'>
                        Username
                </label>
                <input 
                    className='login__input' 
                    type='text' 
                    name='username' 
                    id='username' 
                />
                <label 
                    className='login__label' 
                    htmlFor='password'>
                        Password
                </label>
                <input 
                    className='login__input' 
                    type='password' 
                    name='password' 
                    id='password' 
                />
                <p className='login__small-text'>Don't have an account?&nbsp;
                    <Link className='login__text-link' to='/signup'>
                        Sign up
                    </Link> 
                    &nbsp;here!
                </p>
                <button className='login__button' type='submit'>
                    Login
                </button>
            </form>
        </main>
    );
};

export default Login;