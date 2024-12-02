
/**
 * Fetches a list of players from the api via backend proxy
 * @returns list of players to frontend
 * 
 * React component "DraftTeam.js" calls fetchPlayers
 * this sends a get request to /api/players
 */

export const fetchPlayers = async () => {
    const res = await fetch('/api/players')  // THIS IS A PLACEHOLDER API CALL
    // need to read sportradar's api documentation for exact endpoints
    
    if (!res.ok) {
        throw new Error(`Failed to fetch players`, res.status)
    }
    return res.json()
}

/**
 * POST request with opponentId in the body
 * @returns result of game
 */

export const simulateGame = async (opponentId) => {
    const res = await fetch('/api/games/simulate', {  // PLACEHOLDER FETCH URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({opponentId})
    })
    if (!res.ok) {
        throw new Error(`Failed to simulate game`, res.status)
    }
    return res.json()
}