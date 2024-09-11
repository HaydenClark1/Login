import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/Stats.css';
import Modal from 'react-modal';


function Stats({closeStatsModal,userID}){

    const [totalLogins, setTotalLogins] = useState(0);
    const [lastLogin, setLastLogin] = useState("");
    const location = useLocation();   


    const getUserStats = (userID) =>{
        return fetch('http://localhost:8443/api/v1/stats', { // Ensure this URL is correct
            method: 'POST', // Change to POST for login since you're sending credentials
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID }), // Send the user data as JSON
            credentials: 'include', // Ensure credentials are included if necessary
        })
        .then(response => {
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(err.error || 'Network response was not ok');
              });
            }
            return response.json();
          });
       
    }

  // Define formatDate function
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString(); // Format to a readable date
};

    useEffect(() => {
      // Fetch user stats from the API if userID is provided
      if (userID) {
        getUserStats(userID)
          .then(data => {
            console.log(data);
            setTotalLogins(data.total_logins || 0);
            setLastLogin(formatDate(data.last_login) || '');
          })
          .catch(err => {
            console.error('Error fetching stats:', err);
          });
      }
  
      // If location.state is available, use it to set the state
      if (location.state) {
        setTotalLogins(location.state.total_logins || 0);
        setLastLogin(formatDate(location.state.last_login) || '');
      }
    }, [userID, location.state]);
  
    return (
        <>
        <div className='stats-container-modal'>
            <h1 className='h1-stats'>Stats</h1>
            {totalLogins && lastLogin && (
                <>
                  <div className='stats-container'>
                      <div className='last-login'>
                          <p className='last-login-text'>Last Login: {lastLogin}</p>
                      </div>
                      <div className='total-logins'>
                          <p className='total-logins-text'>Total Logins: {totalLogins}</p>
                      </div>

                  </div>
                </>
            )}

        </div>
        
        
        
        
        </>

    );

}
export default Stats;