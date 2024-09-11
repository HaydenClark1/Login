import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../style/Login.css';
import Modal from 'react-modal';


function Login({closeLoginModal}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value); // Fix for handling password

    const signin = (user) => {
        console.log(user);
        return fetch('http://localhost:8443/api/v1/login', { // Ensure this URL is correct
            method: 'POST', // Change to POST for login since you're sending credentials
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user), // Send the user data as JSON
            credentials: 'include', // Ensure credentials are included if necessary
        })
        .then(response => {
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(err.error || 'Network response was not ok');
              });
            }else{
                closeLoginModal();
            }
            return response.json();
          });
       
    };

    const handleSignIn = () =>{
        signin({email, password})
        .then(data => {
          const {firstName, lastName, id } = data;
          navigate('/',{state: {firstName, lastName, id}});
        })
        .catch(err => {
          console.error('Fetch error:', err);
          alert(err.message); // Display the error message to the user
        });
    };

    return (
        <>
          <Modal
            isOpen={true}
            onRequestClose={closeLoginModal}
            contentLabel="Login in Modal"
            className="modal-login" // Ensure you have styles for this class
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
            >
            <button onClick={closeLoginModal} className="modal-close-button">Close</button>
            <div className="login-container">
                <h1>LOGIN</h1>
                <div className="login-input-container">
                    <div className='email-container'>
                        <input
                            className="email-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmail}
                            required
                        />
                    </div>
                    <div className='password-container'>
                        <input
                            className="password-input"
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                        />
                    </div>
                    <div className="submit-button-container">
                        <button
                            className="submit-button"
                            onClick={handleSignIn}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            </Modal>
        </>
    );
}

export default Login;
