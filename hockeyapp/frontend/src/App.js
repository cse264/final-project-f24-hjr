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
          <div className="logo-container">
            <img src={logo} alt="HockeyBuilder Logo" className="logo" />
          </div>
          <nav className="navbar">
            <ul className="nav-links">
              <li>
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li>
                <Link
                  to={role === 'user' ? '/draft-team' : '#'}
                  onClick={handleDraftTeamClick}
                  className={`nav-link ${role !== 'user' ? 'disabled' : ''}`}
                >
                  Draft Team
                </Link>
              </li>
              <li>
                <Link
                  to={role === 'admin' ? '/view-team' : '#'}
                  onClick={handleViewTeamClick}
                  className={`nav-link ${role !== 'admin' ? 'disabled' : ''}`}
                >
                  View Teams
                </Link>
              </li>
              <li>
                <Link to="/play-game" className="nav-link">Play Game</Link>
              </li>
            </ul>
          </nav>
          {role && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </header>
  
        <main className="content">
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