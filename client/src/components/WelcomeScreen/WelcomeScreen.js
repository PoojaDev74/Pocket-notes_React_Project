import React from 'react';
import backgroundImage from '../../Assets/background-image.png';
import './WelcomeScreen.module.css';

const WelcomeScreen = () => {
  return (
    <div className="welcome-section">
    <div className="welcome-screen">
      <img src={backgroundImage} alt="Pocket Notes Background" />
     <div className="empty-state">
      <h2>Pocket Notes</h2>
      <p>Send and receive messages without keeping your phone online.</p>
      <p>Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
     </div>
      <div className="footer">🔒 end-to-end encrypted</div>
    </div>
    </div>
  );
};

export default WelcomeScreen;
