// HomePage.jsx
import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import Signup from './Signup';
import Login from './Login';
import profilePic from '../images/profilepic.jpg';
import '../style/HomePage.css';

Modal.setAppElement('#root'); // For accessibility reasons

function HomePage() {

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openSignupModal = () => setIsSignupOpen(true);
  const closeSignupModal = () => setIsSignupOpen(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const[isDropdownOpen, setIsDropdownOpen] = useState(false);

    const location = useLocation();   
    
    // Initialize state from location.state
     useEffect(() => {
        if (location.state) {
            setFirstName(location.state.firstName || '');
            setLastName(location.state.lastName || '');
        }
    }, [location.state]);

    const handleLogout = () =>{
       
    }

    const toggleDropdown = () =>{
        setIsDropdownOpen(true);
    }
    return (
        <>
            <div className='homepage'>
                <div className='profile' onClick={toggleDropdown}>
                    {firstName && lastName && (
                        <>
                            <img className="profile-pic" src={profilePic} alt="Profile Picture" />
                            <div className='name-container'>
                                <p className='names'> {firstName} {lastName}</p>
                            </div>
                        </>
                    )}
                </div>
                <h1 className='homepage-title'>Hayden Clark's Login Example</h1>
                <div className='homepage-link'>
                    <button className='signup-button-homepage' onClick={openSignupModal}>Signup</button>
                    <button className='login-button-homepage' onClick={openLoginModal}>Login</button>
                </div>
            </div>

            {/* Signup Modal Component */}
          <Modal
              isOpen={isSignupOpen}  // Correct variable for modal state
              onRequestClose={closeSignupModal}
              contentLabel="Signup Modal"
              className="modal-content"
              overlayClassName="modal-overlay"
              shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
          >
              <div className="modal-body">
                  <Signup closeSignupModal={closeSignupModal} openLoginModal={openLoginModal} isSignupOpen={isSignupOpen} />
              </div>
          </Modal>

          {/* If you have a login modal, you can add similar logic for login */}
          <Modal
              isOpen={isLoginOpen}
              onRequestClose={closeLoginModal}
              contentLabel="Login Modal"
              className="modal-content"
              overlayClassName="modal-overlay"
              shouldCloseOnOverlayClick={false} // Prevent closing on overlay click
              >
              <div className="modal-body">
                  <Login closeLoginModal={closeLoginModal} />
              </div>
              <button onClick={closeLoginModal} className="modal-close-button">Close</button>
          </Modal>
        </>
    );
}

export default HomePage;
