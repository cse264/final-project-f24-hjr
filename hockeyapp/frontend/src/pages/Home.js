import React from 'react';
import logo2 from './logo-alt.gif';

function Home() {
  return (
    <div>
        <h1>Welcome to HockeyBuilder</h1>
        <p>Build your dream hockey team and compete against others!</p>
        <img src={logo2} alt="HockeyBuilder Logo" className="logo2" />
    </div>
  );
}

export default Home;

