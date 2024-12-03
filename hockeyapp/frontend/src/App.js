import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import DraftTeam from './pages/DraftTeam.js';
import ViewTeam from './pages/ViewTeam.js';
import PlayGame from './pages/PlayGame.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import logo from './NHL-Logo.png';

function App() {
  const [role, setRole] = useState(null); // Role: null, 'admin', or 'user'

  const handleDraftTeamClick = () => {
    if (role === 'user') {
      return; // Allow user access
    }
    alert('Access denied. Only users can draft teams.'); // Prevent admin access
  };

  const handleViewTeamClick = () => {
    if (role === 'admin') {
      return; // Allow admin access
    }
    alert('Access denied. Only admins can view teams.'); // Prevent user access
  };

  const handleLogout = () => {
    setRole(null); // Reset the role to null
    alert('You have been logged out.');
  };

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <img src={logo} alt="HockeyBuilder Logo" className="logo" />
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link 
                  to={role === 'user' ? '/draft-team' : '#'}
                  onClick={handleDraftTeamClick}
                >
                  Draft Team
                </Link>
              </li>
              <li>
                <Link 
                  to={role === 'admin' ? '/view-team' : '#'}
                  onClick={handleViewTeamClick}
                >
                  View Teams
                </Link>
              </li>
              <li>
                <Link to="/play-game">Play Game</Link>
              </li>
            </ul>
          </nav>
          {role && ( // Show Logout button only if a role is set
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setRole={setRole} />} />
            <Route path="/draft-team" element={<DraftTeam />} />
            <Route path="/view-team" element={<ViewTeam />} />
            <Route path="/play-game" element={<PlayGame />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;