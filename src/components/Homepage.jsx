import React, { useState } from 'react';
import '../style/Homepage.css';

function Homepage() {
    // State variables to store user inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to send user inputs to the Java program via WebSocket
    const sendDataToJava = () => {
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        // Connect to the WebSocket server (Java program)
        const socket = new WebSocket("wss://18.222.253.68:8080? &name=" + firstName
                + "&lastname=" + lastName + "&email=" + email + "&password=" + password
        );

        // Send data to the server when the connection is open
        socket.onopen = function(event) {
            console.log("WebSocket connection opened");
            socket.send(JSON.stringify(data));
        };

        // Close the WebSocket connection when done
        socket.onclose = function(event) {
            console.log("WebSocket connection closed");
        };
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

export default Homepage;
