// import React from 'react';

// function DraftTeam() {
//   return (
//     <div>
//       <h1>Draft Team</h1>
//       <p>Select players within the salary cap to build your team.</p>
//     </div>
//   );
// }

// export default DraftTeam;
import React, { useState, useEffect } from "react";
import { fetchPlayers } from "../api";

const MAX_SALARY_CAP = 80000000; // Example salary cap in USD.

function DraftTeam() {
  const [players, setPlayers] = useState([]);
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [salaryUsed, setSalaryUsed] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch players when the component mounts
  useEffect(() => {
    fetchPlayers().then((data) => setPlayers(data));
  }, []);

  // Handle adding a player to the team
  const handleDraftPlayer = (player) => {
    if (salaryUsed + player.salary > MAX_SALARY_CAP) {
      alert("You cannot exceed the salary cap!");
      return;
    }
    setDraftedPlayers((prev) => [...prev, player]);
    setSalaryUsed((prev) => prev + player.salary);
  };

  // Filter players by search term
  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Draft Your Team</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <h2 className="text-xl">Players</h2>
      <ul className="list-disc pl-6">
        {filteredPlayers.map((player) => (
          <li key={player.id} className="flex justify-between my-2">
            <span>{player.name} - ${player.salary.toLocaleString()}</span>
            <button
              onClick={() => handleDraftPlayer(player)}
              className="px-4 py-1 bg-blue-500 text-white rounded"
            >
              Draft
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl mt-6">Drafted Team</h2>
      <p>Salary Used: ${salaryUsed.toLocaleString()} / ${MAX_SALARY_CAP.toLocaleString()}</p>
      <ul className="list-disc pl-6">
        {draftedPlayers.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DraftTeam;
