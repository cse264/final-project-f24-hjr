import React, { useState, useEffect } from "react";

function DraftTeam() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState({
    leftWing: null,
    center: null,
    rightWing: null,
    defense1: null,
    defense2: null,
  });
  const [error, setError] = useState("");
  const [teamTitle, setTeamTitle] = useState("");

  // Fetch all players when the component mounts
  useEffect(() => {
    fetchPlayers();
  }, []);

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

  const searchPlayers = async () => {
    try {
      const endpoint = position ? `/players/${position}` : `/players`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }
      const data = await response.json();

      const filteredPlayers = data.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPlayers(filteredPlayers);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPlayer = (player) => {
    if (team[player.position]) {
      setError(`The ${player.position} position is already filled.`);
      return;
    }

    if (player.position === "defense" && team.defense1 && team.defense2) {
      setError("Both defense positions are already filled.");
      return;
    }

    const updatedTeam = { ...team };
    if (player.position === "defense") {
      if (!team.defense1) {
        updatedTeam.defense1 = player;
      } else {
        updatedTeam.defense2 = player;
      }
    } else {
      updatedTeam[player.position] = player;
    }

    setTeam(updatedTeam);
    setError(""); // Clear any previous error
  };

  const saveTeam = async () => {
    if (
      !team.leftWing ||
      !team.center ||
      !team.rightWing ||
      !team.defense1 ||
      !team.defense2
    ) {
      setError("The team must have all positions filled before saving.");
      return;
    }

    try {
      const response = await fetch("/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: teamTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to save the team");
      }

      const { id: teamId } = await response.json();

      const playerPromises = Object.values(team).map((player) =>
        fetch(`/teams/${teamId}/players`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerId: player.id }),
        })
      );

      await Promise.all(playerPromises);

      alert("Team saved successfully!");
      setTeam({
        leftWing: null,
        center: null,
        rightWing: null,
        defense1: null,
        defense2: null,
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
            <option value="leftWing">Left Wing</option>
            <option value="center">Center</option>
            <option value="rightWing">Right Wing</option>
            <option value="defense">Defense</option>
          </select>
          <button onClick={searchPlayers} style={{ padding: "0.5rem 1rem" }}>
            Search
          </button>
        </div>

        <ul>
          {players.map((player) => (
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
          ))}
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
      </div>
    </div>
  );
}

export default DraftTeam;
