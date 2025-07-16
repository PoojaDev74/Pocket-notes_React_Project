import React from 'react';
import backgroundImage from './Assests/background-image.png';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <img src={backgroundImage} alt="Pocket Notes Background" className="welcome-img" />
      <h2>Pocket Notes</h2>
      <p>Send and receive messages without keeping your phone online.</p>
      <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
      <div className="encryption-note">🔒 end-to-end encrypted</div>
    </div>
  );
};

export default WelcomeScreen;
