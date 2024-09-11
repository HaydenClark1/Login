import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
            body: JSON.stringify(userID), // Send the user data as JSON
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

    const formatDate = (date) => {
      const d = new Date(date);
      return d.toLocaleString(); // Format to a readable date
    };

    useEffect(() =>{
      getUserStats(userID);
      console.log(location.state); // Check if lastLogin exists
        if(location.state){
            setTotalLogins(location.state.totalLogins);
            setLastLogin(formatDate(location.state.lastLogin));
        }

    },[location.state]);

    return (
        <>
        <div className='Stats-container'>
            <h1 className='h1-stats'>Stats</h1>
            {totalLogins && lastLogin && (
                <>
                  <div className='stats'>
                      <div className='last-login'>
                          <p>{lastLogin}</p>
                      </div>

                  </div>
                </>
            )}

        </div>
        
        
        
        
        </>

    );

}
export default Stats;