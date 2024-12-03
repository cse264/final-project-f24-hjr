import 'dotenv/config'

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://zvkfrsshquzrarleyako.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const myPlayersTable = 'skaters' 
const myTeamsTable = 'teams'

const playerRoutes = (app) => {

    /**
     * GET - /players
     * Returns a JSON listing of all players in the database
     */
    app.get('/players', async (req, res, next) => {
        try{
            const qs = `SELECT * FROM ${myPlayersTable} where situation = all`
            query(qs).then(data => res.json(data.rows))
        }catch (err){
            next(err)
        }
    })

    /**
     * POST - /teams
     */
    app.post('/teams', async (req, res, next) => {
      try{
        // what columns do we need for teams???
        const title = req.body.title
        const body = req.body.body

        if(!title || !body){
          return res.status(404).send("Missing required fields: title, body")
        }
        if(title && title.length > 255){
          return res.status(400).send("Title length is above 255 characters.")
        }

        const qs = `INSERT into ${myTeamsTable} (film_id, title, body, date) VALUES(${film_id}, '${title}', '${body}', '${date}')`
        query(qs).then(data => {res.json(data.rows)})
      }catch(err){
        next(err)
      }
    })

}



// const fetchPlayers = async () => {
//   const { data, error } = await supabase
//     .from(`${myPlayersTable}`) // Table name
//     .select('* where situation = all');    // Columns to select (use '*' for all)

//   if (error) {
//     console.error('Error fetching players:', error);
//     return;
//   }

//   console.log('Players data:', data);
// };

// fetchPlayers();




// const express = require('express');
// const app = express();

//insert axios here?? const axios = require("axios");

// API info from env
// const api_url = process.env.API_BASE_URL;
// const api_key = process.env.SPORTRADAR_API_KEY;

/**
 * GET - /players
 * returns all players from api ??
 * Param: api_key
 * Return 500 if there is an error fetching
 */

// something like: `${SPORTRADAR_BASE_URL}/players/${teamId}/profile.json' for api call




// <<<<<<< HEAD
// const fetchPlayers = async () => {
//     const { data, error } = await supabase
//       .from(`${myPlayersTable}`) // Table name
//       .select(' * where situation = all');    // Columns to select (use '*' for all)
  
//     if (error) {
//       console.error('Error fetching players:', error);
//       return;
//     }
  
//     console.log('Players data:', data);
//   };
  
// fetchPlayers();

// const playerRoutes = (app) => {

//     /**
//      * GET - /players
//      * Returns a JSON listing of all players in the database
//      */
//     app.get('/players', async (req, res, next) => {
//         try{
//             const qs = `SELECT * FROM ${myPlayersTable} where situation = all`
//             query(qs).then(data => res.json(data.rows))
//         }catch (err){
//             next(err)
//         }
//     })

// }
// =======
// >>>>>>> daec223a5523299b73fa8f40c5edcc00f43b0d06


// app.get('/api/players', async(req, res) => {
//     try{

//     }catch(err){

//     }
// })