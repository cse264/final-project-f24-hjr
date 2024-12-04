import React, { useState, useEffect } from "react";

function PlayGame() {
  const [teams, setTeams] = useState([]);
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [selectedTeam1, setSelectedTeam1] = useState(null); // Store selectedTeam1
  const [selectedTeam2, setSelectedTeam2] = useState(null); // Store selectedTeam2
  const [players1, setPlayers1] = useState([]);
  const [players2, setPlayers2] = useState([]);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState("");
  const [gameSet, setGameSet] = useState(false);

  // Fetch teams when the component mounts
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/teams");
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch teams. Please try again.");
      }
    };

    fetchTeams();
  }, []);

  const handleSetGame = () => {
    if (!team1 || !team2) {
      setError("Please select two teams to play!");
      return;
    }
    if (team1 === team2) {
      setError("Teams must be different!");
      return;
    }

    setError("");
    const selectedTeam1Data = teams.find((team) => team.teamName === team1);
    const selectedTeam2Data = teams.find((team) => team.teamName === team2);

    setSelectedTeam1(selectedTeam1Data);
    setSelectedTeam2(selectedTeam2Data);

    setPlayers1([
      selectedTeam1Data.left,
      selectedTeam1Data.center,
      selectedTeam1Data.right,
      selectedTeam1Data.defense1,
      selectedTeam1Data.defense2,
      selectedTeam1Data.teamAVGPoints,
    ]);

    setPlayers2([
      selectedTeam2Data.left,
      selectedTeam2Data.center,
      selectedTeam2Data.right,
      selectedTeam2Data.defense1,
      selectedTeam2Data.defense2,
      selectedTeam2Data.teamAVGPoints,
    ]);

    setGameSet(true);
    setWinner(null); // Reset winner if previously set
  };

  const handlePlayGame = () => {
    if (!selectedTeam1 || !selectedTeam2) {
      setError("Game is not set properly. Please set the game first.");
      return;
    }

    const team1BaseOdds = 0.5;
    const team2BaseOdds = 0.5;

    const difference =
      selectedTeam1.teamAVGPoints - selectedTeam2.teamAVGPoints;
    const team1Odds =
      difference > 20
        ? 0.7
        : difference > 10
        ? 0.6
        : difference < -20
        ? 0.3
        : difference < -10
        ? 0.4
        : team1BaseOdds;

    const team2Odds = 1 - team1Odds;

    // Random number to decide the winner
    const randomValue = Math.random();
    const grabWinner = randomValue < team1Odds ? selectedTeam1 : selectedTeam2;

    // Set the winner
    setWinner(grabWinner);
  };

  const handleReset = () => {
    setTeam1(null);
    setTeam2(null);
    setSelectedTeam1(null);
    setSelectedTeam2(null);
    setPlayers1([]);
    setPlayers2([]);
    setGameSet(false);
    setWinner(null);
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Play Game</h1>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        {!gameSet && (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-2">Select Team 1:</label>
              <select
                value={team1 || ""}
                onChange={(e) => setTeam1(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.teamId} value={team.teamName}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Select Team 2:</label>
              <select
                value={team2 || ""}
                onChange={(e) => setTeam2(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.teamId} value={team.teamName}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center">
              <button
                onClick={handleSetGame}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none mr-4"
              >
                Set Game
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 focus:outline-none"
              >
                Reset
              </button>
            </div>
          </>
        )}

        {gameSet && (
          <>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-4 text-center">{team1}</h2>
                <ul className="list-disc list-inside">
                  {players1.map((player, index) => (
                    <li key={index} className="mb-2">
                      {player}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4 text-center">{team2}</h2>
                <ul className="list-disc list-inside">
                  {players2.map((player, index) => (
                    <li key={index} className="mb-2">
                      {player}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handlePlayGame}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 focus:outline-none mr-4"
              >
                Play Game
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 focus:outline-none"
              >
                Reset
              </button>
            </div>
          </>
        )}

        {winner && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-green-600">
              🎉 Congratulations {winner.teamName}! 🎉
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayGame;
