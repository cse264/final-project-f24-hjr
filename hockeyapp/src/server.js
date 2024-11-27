require('dotenv').config();
const express = require('express');
const app = express();

//insert axios here?? const axios = require("axios");

// API info from env
const api_url = process.env.API_BASE_URL;
const api_key = process.env.SPORTRADAR_API_KEY;

/**
 * GET - /players
 * returns all players from api ??
 * Param: api_key
 * Return 500 if there is an error fetching
 */

// something like: `${SPORTRADAR_BASE_URL}/players/${teamId}/profile.json' for api call

app.get('/api/players', async(req, res) => {
    try{

    }catch(err){

    }
})