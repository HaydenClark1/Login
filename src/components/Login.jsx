import React, { useState } from 'react';
import '../style/Login.css';
import axios from 'axios';

const apiUrl = 'http://localhost:8443/api/v1/user';

function Login() {
    // State variables to store user inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to send user inputs to the Java program via axios
    const sendDataToJava = async () => {
        try {
            data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
            const response = await axios.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Fixed syntax error here
            });
            console.log(response.data); // Handle response data
        } catch (error) {
            console.error('Error sending data:', error); // Handle errors
        }
    };

    // Event handlers to update state variables
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Event handler for form submission
    const handleSubmit = () => {
        sendDataToJava(); // Send user inputs to the Java program
    };

    return (
        <div className="homepage">
            <h1 className="homepage-signup">Sign up</h1>
            <div className='input-container'>
                <input
                    className='first-name-text'
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
            </div>
            <div className='input-container'>
                <input
                    className='last-name-text'
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
            </div>
            <div className='input-container'>
                <input
                    className='email-text'
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className='input-container'>
                <input
                    className='password-text'
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />  
            </div>
            <div className='input-container'>
                <button
                    className='submit-button'
                    onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Login;
