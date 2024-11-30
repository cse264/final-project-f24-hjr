import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import DraftTeam from './pages/DraftTeam';
import ViewTeam from './pages/ViewTeam';
import PlayGame from './pages/PlayGame';
import Home from './pages/Home';
import logo from './NHL-Logo.png';
import logo2 from './logo-alt.gif'

function App() {
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
                <Link to="/draft-team">Draft Team</Link>
              </li>
              <li>
                <Link to="/view-team">View Team</Link>
              </li>
              <li>
                <Link to="/play-game">Play Game</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
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
