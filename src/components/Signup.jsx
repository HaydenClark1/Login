import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../style/Signup.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Signup({closeSignupModal,openLoginModal,isSignupOpen}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Get the navigate function

    const signin = (user) => {
        return fetch('http://54.224.245.62:8443/api/v1/user', { // Ensure this URL is correct
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
          credentials: 'include', // Ensure credentials are included if necessary
        })
          .then(response => {
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(err.error || 'Network response was not ok');
              });
            }else{
              closeSignupModal();
            }

            return response.json();
          });
      };
      

    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSubmit = () => {
        signin({ firstName, lastName, email, password })
          .then(response => {
            navigate('/',{state: {firstName, lastName}});
          })
          .catch(err => {
            // Handle error from server response
            console.error('Fetch error:', err);
            alert(err.message); // Display the error message to the user
          });
      };

    const handleLogin = () =>{
      closeSignupModal();
      openLoginModal();
    };
      
      

    return (
    <>
    
      <Modal
       isOpen={isSignupOpen}
       onRequestClose={closeSignupModal}
       shouldFocusAfterRender={true}
       contentLabel="Sign up Modal"
       className="modal-signup" // Ensure you have styles for this class
       overlayClassName="modal-overlay"
       shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
       >
      
      <button onClick={closeSignupModal} className="modal-close-button">Close</button>
        <div className="signup">
            <h1 className="signup-text">Sign up</h1>
            <div className='input-container'>
                <input
                    className='first-name-text'
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    tabIndex="1"
                />
            </div>
            <div className='input-container'>
                <input
                    className='last-name-text'
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={handleLastNameChange}
                    tabIndex="2"
                />
            </div>
            <div className='input-container'>
                <input
                    className='email-text'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    tabIndex="3"
                />
            </div>
            <div className='input-container'>
                <input
                    className='password-text'
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    tabIndex="4"
                />
            </div>
            <div className='input-container-signup'>
                <button
                    className='submit-button'
                    onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <div className='login-button-container'>
              <h4 className='login-message'>Already have an account?</h4>
              <button
                className='login-button'
                onClick={handleLogin}>
                Login
              </button>
            </div>
        </div>
        </Modal>
      </>
    );
}

export default Signup;
