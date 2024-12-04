/**
 * ViewTeams page
 * This file contains the functionality and the look of the viewteams UI
 */

import React, { useState, useEffect } from 'react';

function ViewTeam() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/teams");
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        const data = await response.json();
        
        console.log("Fetched Teams: ", data); // Log to check data
        setTeams(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch teams. Please try again.");
      }
    };

    fetchTeams();
  }, []);

  const handleDelete = async (teamId) => {
    try {
      const response = await fetch(`/teams/${teamId}`, {  // Ensure this matches your backend route
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete team");
      }

      // Remove the deleted team from the list in the frontend
      setTeams((prevTeams) => prevTeams.filter((team) => team.teamId !== teamId));
      alert("Team deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete team. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Your Teams</h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        {teams.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left">Team Name</th>
                <th className="px-4 py-2 border-b text-left">Left Wing</th>
                <th className="px-4 py-2 border-b text-left">Center</th>
                <th className="px-4 py-2 border-b text-left">Right Wing</th>
                <th className="px-4 py-2 border-b text-left">Defense 1</th>
                <th className="px-4 py-2 border-b text-left">Defense 2</th>
                <th className="px-4 py-2 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.teamId} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{team.teamName}</td>
                  <td className="px-4 py-2 border-b">{team.left}</td>
                  <td className="px-4 py-2 border-b">{team.center}</td>
                  <td className="px-4 py-2 border-b">{team.right}</td>
                  <td className="px-4 py-2 border-b">{team.defense1}</td>
                  <td className="px-4 py-2 border-b">{team.defense2}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleDelete(team.teamId)}  // Trigger DELETE request for the team
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No teams available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewTeam;
