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
    <div className="p-6 bg-background text-white min-h-screen">
  <h1 className="text-4xl font-extrabold text-primary mb-6">Draft Your Team</h1>

  <div className="mb-6">
    <input
      type="text"
      placeholder="Search players..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-3 w-full border-2 border-secondary rounded-md focus:border-primary outline-none"
    />
  </div>

  <h2 className="text-2xl font-bold mb-4">Available Players</h2>
  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {filteredPlayers.map((player) => (
      <li
        key={player.id}
        className="bg-secondary p-4 rounded-lg shadow-lg hover:bg-primary hover:shadow-xl transition transform hover:-translate-y-1"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">{player.name}</span>
          <span>${player.salary.toLocaleString()}</span>
        </div>
        <button
          onClick={() => handleDraftPlayer(player)}
          className="w-full px-4 py-2 bg-accent text-white font-bold rounded-md hover:bg-primary transition"
        >
          Draft Player
        </button>
      </li>
    ))}
  </ul>

  <h2 className="text-2xl font-bold mt-8">Drafted Players</h2>
  <p className="mb-4">Salary Used: ${salaryUsed.toLocaleString()} / ${MAX_SALARY_CAP.toLocaleString()}</p>
  <ul className="space-y-2">
    {draftedPlayers.map((player, index) => (
      <li key={index} className="text-lg font-semibold">{player.name}</li>
    ))}
  </ul>
</div>
  );
}

export default DraftTeam;
