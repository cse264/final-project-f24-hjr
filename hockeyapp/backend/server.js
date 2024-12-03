import 'dotenv/config';
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zvkfrsshquzrarleyako.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const myPlayersTable = 'skaters';
const myTeamsTable = 'teams';

const app = express();
app.use(express.json()); // To parse JSON request bodies

// GET - /players
app.get('/players', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from(myPlayersTable)
      .select('*');
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching players:', err);
    next(err);
  }
});

// GET - /players/:position
app.get('/players/:position', async (req, res, next) => {
  try {
    const position = req.params.position;
    const { data, error } = await supabase
      .from(myPlayersTable)
      .select('*')
      .eq('position', position);
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching players by position:', err);
    next(err);
  }
});

// POST - /teams
app.post('/teams', async (req, res, next) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).send('Missing required fields: title, body');
    }

    if (title.length > 255) {
      return res.status(400).send('Title length is above 255 characters.');
    }

    const { data, error } = await supabase
      .from(myTeamsTable)
      .insert({ title, body, date: new Date() })
      .select();

    if (error) throw error;

    res.json(data[0]); // Returning the newly created team
  } catch (err) {
    console.error('Error creating team:', err);
    next(err);
  }
});

// GET - /teams
app.get('/teams', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from(myTeamsTable)
      .select('*');
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching teams:', err);
    next(err);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
