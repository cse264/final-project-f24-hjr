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

      // Filter players by position if a position is selected
      if (position) {
        endpoint += `/${position}`;
      }

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch players");

      const data = await response.json();

      // Apply search term filtering (if any)
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
    if (player.position === "D") {
      if(team.D && team.D.name === player.name){
        setError('Cannot choose the same defensemen twice.')
        return;
      }

      if (team.D && team.D2) {
        setError("Both defense positions are already filled.");
        return;
      }

      const updatedTeam = { ...team };
      if (!team.D) updatedTeam.D = player;
      else updatedTeam.D2 = player;

      setTeam(updatedTeam);
      setError(""); // Clear any previous error
      return;
    }

    // FORWARDS
    if (team[player.position]) {
      setError(`The ${player.position} position is already filled.`);
      return;
    }

    // Add FORWARDS
    const updatedTeam = { ...team };
    updatedTeam[player.position] = player;
    setTeam(updatedTeam);
    setError(""); // Clear any previous error
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
      const avg = Math.round(
        (Number(team.L.I_F_points) +
          Number(team.C.I_F_points) +
          Number(team.R.I_F_points) +
          Number(team.D.I_F_points) +
          Number(team.D2.I_F_points)) / 5
      );
      
      const payload = {
        teamAVGPoints: avg,
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
      setTeam({ L: null, C: null, R: null, D: null, D2: null , teamAVGPoints: null});
      setTeamTitle("");
    } catch (err) {
      console.error(err);
      setError("Failed to save the team. Please try again.");
    }
  };

  
  const renderTeam = () => {
    return Object.entries(team)
      .filter(([key]) => key !== "teamAVGPoints") //exclude teamAVGPoints
      .map(([position, player]) => (
        <div key={position} className="mb-2">
          <strong className="text-lg">{position}:</strong>{" "}
          {player ? player.name : "Empty"}
        </div>
      ));
  };
  

  // using Tailwind CSS
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Team Section */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Team</h2>
        <input
          type="text"
          placeholder="Team Name"
          value={teamTitle}
          onChange={(e) => setTeamTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
        />
        {renderTeam()}
        <button
          onClick={saveTeam}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4 w-full"
        >
          Save Team
        </button>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>

      {/* Search Section */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Search Players</h2>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-2/3"
          />
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          >
            <option value="">All Positions</option>
            <option value="L">Left Wing</option>
            <option value="C">Center</option>
            <option value="R">Right Wing</option>
            <option value="D">Defense</option>
          </select>
          <button
            onClick={searchPlayers}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        <ul>
          {players.length > 0 ? (
            players.map((player) => (
              <li key={player.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg">
                    {player.name} ({player.position})
                  </span>
                  <button
                    onClick={() => handleAddPlayer(player)}
                    className="px-4 py-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded-lg hover:from-green-500 hover:to-green-700"
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
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default DraftTeam;
