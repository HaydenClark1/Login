import React, { useState } from 'react';
import '../style/Login.css';


function Login() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signin = user => {
        console.log('user', user);
        console.log(JSON.stringify(user));
        return fetch('http://localhost:8443/api/v1/user', { // Ensure this URL is correct
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
          credentials: 'include', // Ensure credentials are included if necessary
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch(err => console.log(err));
      };
      
      

    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSubmit = () => {
        const user = {firstName, lastName, email, password};
        signin(user);
    }

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
