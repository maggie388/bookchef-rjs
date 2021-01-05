import React, { Component } from 'react';
import './SignUp.scss';
// import axiosInstance from '../../utils/axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import mailcheck from 'mailcheck';

// ASSETS
import alertIcon from '../../assets/icons/alert.svg';
import xIcon from '../../assets/icons/close-circle.svg';
import checkIcon from '../../assets/icons/check-circle.svg';

class SignUp extends Component {
    initialState = {
        name: '',
        email:'',
        emailAlert: false,
        emailAlertMessage: '',
        password: '',
        passwordChecklistIcons: {
            length: xIcon, 
            lowercase: xIcon, 
            uppercase: xIcon,
            specialChar: xIcon,
            number: xIcon
        }
    }

    state = this.initialState;

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkForEmailSuggestion = () => {
        const showEmailAlert = (suggestion) => {
            this.setState({
                emailAlert: true,
                emailAlertMessage: `Did you mean ${suggestion}`
            })
        }

        const removeEmailAlert = () => {
            this.setState({
                emailAlert: false,
                emailAlertMessage: ''
            })
        }

        mailcheck.run({
            email: this.state.email,
            suggested: function(suggestion) {
                showEmailAlert(suggestion.full);
            },
            empty: function() {
                removeEmailAlert();
            }
        })
        
    }

    handlePasswordChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.passwordMeetsRequirements(this.state.password)
        });
    }

    passwordMeetsRequirements(password) {
        let passwordChecklistIcons = this.state.passwordChecklistIcons;

        // check for minimum length
        if (password.length > 7) {
            passwordChecklistIcons.length = checkIcon;
            this.setState({
                passwordChecklistIcons
            })
        } else {
            passwordChecklistIcons.length = xIcon;
            this.setState({
                passwordChecklistIcons
            })
        }

        // check for a lowercase letter
        if (password.match(/[a-z]/)) {
            passwordChecklistIcons.lowercase = checkIcon;
            this.setState({
                passwordChecklistIcons
            })
        } else {
            passwordChecklistIcons.lowercase = xIcon;
            this.setState({
                passwordChecklistIcons
            })
        }

        // check for an uppercase letter
        if (password.match(/[A-Z]/)) {
            passwordChecklistIcons.uppercase = checkIcon;
            this.setState({
                passwordChecklistIcons
            })
        } else {
            passwordChecklistIcons.uppercase = xIcon;
            this.setState({
                passwordChecklistIcons
            })
        }

        // check for a special character
        if (password.match(/\W|_/)) {
            passwordChecklistIcons.specialChar = checkIcon;
            this.setState({
                passwordChecklistIcons
            })
        } else {
            passwordChecklistIcons.specialChar = xIcon;
            this.setState({
                passwordChecklistIcons
            })
        }

        // check for a special character
        if (password.match(/\d/)) {
            passwordChecklistIcons.number = checkIcon;
            this.setState({
                passwordChecklistIcons
            })
        } else {
            passwordChecklistIcons.number = xIcon;
            this.setState({
                passwordChecklistIcons
            })
        }
    }

    
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        if (this.checkIfInputEmpty(name) && this.checkIfInputEmpty(email) && this.checkIfInputEmpty(password)) {
            console.log('form submitted');
            this.setState(() => this.initialState)
        } else {
            console.log('one or more inputs is empty');
        }
    }

    checkIfInputEmpty(input) {
        let trimmedInput = input.trim();
        return !!trimmedInput;
    }

    render() {
        const renderEmailAlert = () => {
            return (
                <>
                    <img className='sign-up__alert-icon' src={alertIcon} alt='Error Alert' />
                    <p className='sign-up__error-message'>{this.state.emailAlertMessage}</p>
                </>
            )
        }

        const { passwordChecklistIcons: icons } = this.state;

        return (
            <main className='sign-up'>
                <form className='sign-up__form' onSubmit={this.handleSubmit}>
                    {/* USERNAME INPUT */}
                    <label 
                        className='sign-up__label' 
                        htmlFor='Name'>
                            Name
                    </label>
                    <input 
                        className='sign-up__input' 
                        type='text' 
                        name='name' 
                        id='name' 
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
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
                        onBlur={this.checkForEmailSuggestion}
                    />
                    <div className='sign-up__error'>
                        {this.state.emailAlert && renderEmailAlert()}
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
                        onChange={this.handlePasswordChange}
                    />
                    <PasswordStrengthBar password={this.state.password} minLength='8'/>
                    <ul className='sign-up__password-checklist'>
                        <li className='sign-up__checklist-item'>
                            <img className='sign-up__checklist-icon' src={icons.length} alt='' />
                            <span>8 characters minimim</span>
                        </li>
                        <li className='sign-up__checklist-item'>
                            <img className='sign-up__checklist-icon' src={icons.lowercase} alt='' />
                            <span>One lowercase character</span>
                        </li>
                        <li className='sign-up__checklist-item'>
                            <img className='sign-up__checklist-icon' src={icons.uppercase} alt='' />
                            <span>One uppercase character</span>
                        </li>
                        <li className='sign-up__checklist-item'>
                            <img className='sign-up__checklist-icon' src={icons.specialChar} alt='' />
                            <span>One special character</span>
                        </li>
                        <li className='sign-up__checklist-item'>
                            <img className='sign-up__checklist-icon' src={icons.number} alt='' />
                            <span>One number</span>
                        </li>
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