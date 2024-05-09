import React, { useState } from 'react';
import '../style/Login.css';

function Login() {
    // State variables to store user inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // Function to send user inputs to the Java program via WebSocket
    const sendDataToJava = async () => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST",'https://3.144.149.240:8080/api/v1/user');
            xhr.setRequestHeader("Content-Type", "application/json");
            const body = JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
            xhr.onload = () =>{
                if (xhr.readyState == 4 && xhr.status == 201) {
                    console.log(JSON.parse(xhr.responseText));
                  } else {
                    console.log(`Error: ${xhr.status}`);
                  }
            };
            xhr.send(body);
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
