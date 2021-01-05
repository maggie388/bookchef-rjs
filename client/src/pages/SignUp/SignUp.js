import React, { Component } from 'react';
import './SignUp.scss';
import axiosInstance from '../../utils/axios';
import PasswordStrengthBar from 'react-password-strength-bar';
import mailcheck from 'mailcheck';

// COMPONENTS
import SignUpFeedback from '../../components/SignUpFeedback/SignUpFeedback';

// ASSETS
import alertIcon from '../../assets/icons/alert.svg';
import xIcon from '../../assets/icons/close-circle.svg';
import checkIcon from '../../assets/icons/check-circle.svg';

class SignUp extends Component {
    initialState = {
        name: '',
        nameErrorMessage: '',
        email:'',
        emailAlertMessage: '',
        emailErrorMessage: '',
        password: '',
        passwordChecklistIcons: {
            length: xIcon, 
            lowercase: xIcon, 
            uppercase: xIcon,
            specialChar: xIcon,
            number: xIcon
        },
        passwordErrorMessage: '', 
        displayFeedback: false
    }

    // deep cloning the original object
    // this method will work as long as all my key values are primatives
    state = JSON.parse(JSON.stringify(this.initialState));

    // for name and email inputs, there is a seperate function the the password input
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'name') {
            this.setState({
                nameErrorMessage: ''
            })
        }
        if (e.target.name === 'email') {
            this.setState({
                emailErrorMessage: ''
            })
        }
    }

    handlePasswordChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
            passwordErrorMessage:''
        }, () => {
            this.passwordMeetsRequirements(this.state.password)
            console.log(this.initialState.password);
        });
    }

    passwordMeetsRequirements(password) {
        let { passwordChecklistIcons } = this.state;

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

    // check for common typos after the user finishes typing (onBlur event)
    // this only works if the email follows the following format *@*
    checkForEmailSuggestion = () => {
        const showEmailAlert = (suggestion) => {
            this.setState({
                emailAlertMessage: `Did you mean ${suggestion}`
            })
        }

        const removeEmailAlert = () => {
            this.setState({
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
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const nameValid = this.checkNameInput(name);
        const emailValid = this.checkEmailInput(email);
        const passwordValid = this.checkPasswordInput(password);
        if (nameValid && emailValid && passwordValid) {
            console.log('form submitted');
            this.signUpNewUser(name, email, password);
            this.setState({ 
                ...this.initialState, 
                displayFeedback: true 
            });
        }
    }

    // name cannot be empty or contain only spaces
    checkNameInput(nameValue) {
        let isValid = true;
        if (this.isInputEmpty(nameValue)) {
            isValid = false;
            this.setState({ 
                name: '',
                nameErrorMessage: 'This field cannot be empty.'
            });
        }
        return isValid;
    }

    // cannot be empty or contain only spaces, and must match *@* format
    // any number of characters can come before and after the @
    checkEmailInput(emailInput) {
        let isValid = true;
        if (this.isInputEmpty(emailInput)) {
            isValid = false;
            this.setState({ 
                email: '',
                emailErrorMessage: 'This field cannot be empty' 
            });
        } else if (!emailInput.match(/@/)) {
            isValid = false;
            this.setState({
                emailErrorMessage: 'The email address is missing an @' 
            });
        } else if (!emailInput.match(/.+@.+/)) {
            isValid = false;
            this.setState({
                emailErrorMessage: 'The email address is too short'
            })
        }
        return isValid;
    }

    // password must meet all criteria listed and cannot be longer than 64 characters
    checkPasswordInput(passwordInput) {
        let isValid = true;
        let checklist = this.state.passwordChecklistIcons;
        let icon;
        for (icon in checklist) {
            if (checklist[icon] === xIcon) {
                isValid = false;
                this.setState({
                    passwordErrorMessage: 'Password does not meet one or more criteria'
                })
                return;
            }
        }
        if (passwordInput.length > 65) {
            isValid = false;
            this.setState({
                passwordErrorMessage: 'Password cannot be more than 64 characters'
            })
        }
        return isValid;
    }

    isInputEmpty(input) {
        let trimmedInput = input.trim();
        return !trimmedInput;
    }

    signUpNewUser(name, email, password) {
        axiosInstance.post('/signup', { name, email, password })
        .then((response) => {
            console.log('user signed up', response);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        const renderEmailSuggestion = () => {
            return (
                <>
                    <img className='sign-up__alert-icon' src={alertIcon} alt='Error Alert' />
                    <p className='sign-up__error-message'>{this.state.emailAlertMessage}</p>
                </>
            )
        }

        const { passwordChecklistIcons: icons } = this.state;

        const renderNameErrorMessage = () => {
            return (
                <>
                    <img className='sign-up__alert-icon' src={alertIcon} alt='Error Alert' />
                    <p className='sign-up__error-message'>{this.state.nameErrorMessage}</p>
                </>
            )
        }

        const renderEmailErrorMessage = () => {
            return (
                <>
                    <img className='sign-up__alert-icon' src={alertIcon} alt='Error Alert' />
                    <p className='sign-up__error-message'>{this.state.emailErrorMessage}</p>
                </>
            )
        }

        const renderPasswordErrorMessage = () => {
            return(
                <>
                    <img className='sign-up__alert-icon' src={alertIcon} alt='Error Alert' />
                    <p className='sign-up__error-message'>{this.state.passwordErrorMessage}</p>
                </>
            )
        }

        if (this.state.displayFeedback) {
            return <SignUpFeedback />;
        }

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
                    <div className='sign-up__error'>
                        {this.state.nameErrorMessage && renderNameErrorMessage()}
                    </div>
                    {/* EMAIL INPUT */}
                    <label 
                        className='sign-up__label' 
                        htmlFor='email'>
                            Email
                    </label>
                    <input 
                        className='sign-up__input' 
                        type='text' 
                        name='email' 
                        id='email' 
                        value={this.state.email}
                        onChange={this.handleChange}
                        onBlur={this.checkForEmailSuggestion}
                    />
                    <div className='sign-up__error'>
                        {this.state.emailAlertMessage && renderEmailSuggestion()}
                        {this.state.emailErrorMessage && renderEmailErrorMessage()}
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
                            <span>8 characters minimum</span>
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
                    <div className='sign-up__error'>
                        {this.state.passwordErrorMessage && renderPasswordErrorMessage()}
                    </div>
                    <button className='sign-up__button' type='submit'>
                        Submit
                    </button>
                </form>
            </main>
        );
    }
}

export default SignUp;