/**
 * Home page
 * This file contains the look of the home UI
 */

import React from 'react';
import logo2 from './logo-alt.gif';

function Home() {
  // using Tailwind CSS
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg border border-gray-200 max-w-3xl">
        <img
          src={logo2} // uses the gif here
          alt="HockeyBuilder Logo"
          className="mx-auto mb-6 w-48 h-48"
        />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">HockeyBuilder</span>  {/* text title */}
        </h1>
        <p className="text-lg text-gray-600">
          Build your dream hockey team and compete against others!  {/* text description */}
        </p>
      </div>
    </div>
  );
}

export default Home;
