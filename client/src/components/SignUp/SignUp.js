import React, { Component } from 'react';
import './SignUp.scss';
// import axiosInstance from '../../utils/axios';

// ASSETS
import alertIcon from '../../assets/icons/alert.svg';

class SignUp extends Component {
    state = {
        username: '',
        email:'',
        password: '',
        confirmPassword: '', 
        usernameError: true,
        emailError: true,
        emailErrorMessage: 'Did you mean ...'
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkIfEmpty = () => {

    }

    isUsernameTaken = () => {

    }

    checkEmail = () => {

    }

    onPasswordChange = () => {

    }
    
    handleSubmit = (e) => {
        e.preventDefault();

    }

    

    render() {

        const usernameAlert = () => {
            return (
                <>
                    <img className='sign-up__alert-icon' src={alertIcon} alt='Error Alert' />
                    <p className='sign-up__error-message'>This username is already taken</p>
                </>
            )
        }

        const emailAlert = () => {
            return (
                <>
                    <img className='sign-up__alert-icon' src={alertIcon} alt='Error Alert' />
                    <p className='sign-up__error-message'>{this.state.emailErrorMessage}</p>
                </>
            )
        }

        return (
            <main className='sign-up'>
                <form className='sign-up__form' onSubmit={this.handleSubmit}>
                    {/* USERNAME INPUT */}
                    <label 
                        className='sign-up__label' 
                        htmlFor='username'>
                            Username
                    </label>
                    <input 
                        className='sign-up__input' 
                        type='text' 
                        name='username' 
                        id='username' 
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <div className='sign-up__error'>
                        {this.state.usernameError && usernameAlert()}
                    </div>
                    {/* EMAIL INPUT */}
                    <label 
                        className='sign-up__label' 
                        htmlFor='email'>
                            Email
                    </label>
                    <input 
                        className='sign-up__input' 
                        type='email' 
                        name='email' 
                        id='email' 
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <div className='sign-up__error'>
                        {this.state.emailError && emailAlert()}
                    </div>
                    {/* PASSWORD INPUT */}
                    <label 
                        className='sign-up__label' 
                        htmlFor='password'>
                            Password
                    </label>
                    <input 
                        className='sign-up__input' 
                        type='password' 
                        name='password' 
                        id='password' 
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <ul className='sign-up__password-requirements'>
                        <li>One lowercase character</li>
                        <li>One uppercase character</li>
                        <li>One special character</li>
                        <li>8 characters minimim</li>
                        <li>One number</li>
                    </ul>
                    <button className='sign-up__button' type='submit'>
                        Submit
                    </button>
                </form>
            </main>
        );
    }
}

export default SignUp;