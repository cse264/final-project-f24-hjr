/**
 * DraftTeams page
 * This file contains the functionality and look of the draftteams UI
 */

import React, { useState, useEffect } from "react";

function DraftTeam() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState({
    L: null,
    C: null,
    R: null,
    D: null,
    D2: null,
  });
  const [error, setError] = useState("");
  const [teamTitle, setTeamTitle] = useState("");

  // Fetches all players as soon as the file mounts, list form
  useEffect(() => {
    fetchPlayers();
  }, []);

  /**
   * Used to fetch a list of all players (position non-specific)
   * Calls the basic GET route
   */
  const fetchPlayers = async () => {
    try {
      const response = await fetch("/players");
      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Used to fetch a list of all players of a certain position
   * Calls the GET route that includes a position parameter
   */
  const searchPlayers = async () => {
    try {
      let endpoint = "/players";

      // if there is a position specified, add the position to the endpoint
      if (position) {
        endpoint += `/${position}`;
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }

      const data = await response.json();

      // Filter the player list to only include players that include the search term
      const filteredPlayers = data.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setPlayers(filteredPlayers);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Used to handle adding a player
   * Guarantees that the team is filled properly
   */
  const handleAddPlayer = (player) => {
    // DEFENSEMEN
    if (player.position === "D") {
      // throw error if user tries to use the same defensemen twice
      if(team.D && team.D.name === player.name){
        setError('Cannot choose the same defensemen twice.')
        return;
      }
      
      // throw error if user tries to choose another defensemen
      if (team.D && team.D2) {
        setError("Both defense positions are already filled.");
        return;
      }
      
      // updates team to add the selected player
      const updatedTeam = { ...team };
      if (!team.D) {
        updatedTeam.D = player;
      } else {
        updatedTeam.D2 = player;
      }

      setTeam(updatedTeam);
      setError(""); 
      return;
    }

    // FORWARDS
    // throw error if the user selects a player for a position that is already filled
    if (team[player.position]) {
      setError(`The ${player.position} position is already filled.`);
      return;
    }

    // updates team to add the selected forward
    const updatedTeam = { ...team };
    updatedTeam[player.position] = player;
    setTeam(updatedTeam);
    setError(""); 
  };

  /**
   * Used to handle saving the selected team
   */
  const saveTeam = async () => {
    // throws an error if there is an empty position
    if (!team.L || !team.C || !team.R || !team.D || !team.D2) {
      setError("The team must have all positions filled before saving.");
      return;
    }

    try {
      const payload = {
        title: teamTitle,
        L: team.L.name,
        C: team.C.name,
        R: team.R.name,
        D: team.D.name,
        D2: team.D2.name,
      };

      const response = await fetch("/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error message:", errorText);
        throw new Error("Failed to save the team");
      }

      alert("Team saved successfully!");
      setTeam({
        L: null,
        C: null,
        R: null,
        D: null,
        D2: null,
      });
      setTeamTitle("");
    } catch (err) {
      console.error(err);
      setError("Failed to save the team. Please try again.");
    }
  };

  
  const renderTeam = () => {
    return Object.entries(team).map(([position, player]) => (
      <div key={position} className="team-position">
        <strong>{position}:</strong> {player ? player.name : "Empty"}
      </div>
    ));
  };

  return (
    <div className="draft-team-container" style={{ display: "flex", gap: "2rem" }}>
      {/* Search Section */}
      <div className="search-section" style={{ flex: 1 }}>
        <h2>Search Players</h2>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginRight: "1rem", padding: "0.5rem" }}
          />
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            style={{ marginRight: "1rem", padding: "0.5rem" }}
          >
            <option value="">All Positions</option>
            <option value="L">Left Wing</option>
            <option value="C">Center</option>
            <option value="R">Right Wing</option>
            <option value="D">Defense</option>
          </select>
          <button onClick={searchPlayers} style={{ padding: "0.5rem 1rem" }}>
            Search
          </button>
        </div>

        <ul>
          {players.length > 0 ? (
            players.map((player) => (
              <li key={player.id} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>
                    {player.name} ({player.position})
                  </span>
                  <button
                    onClick={() => handleAddPlayer(player)}
                    style={{ padding: "0.5rem" }}
                  >
                    Add to Team
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No players found</li>
          )}
        </ul>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {/* Team Section */}
      <div className="team-section" style={{ flex: 1 }}>
        <h2>Your Team</h2>
        <input
          type="text"
          placeholder="Team Name"
          value={teamTitle}
          onChange={(e) => setTeamTitle(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem", display: "block" }}
        />
        {renderTeam()}
        <button onClick={saveTeam} style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>
          Save Team
        </button>
        {/* Error Section */}
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </div>
  );
}

export default DraftTeam;
