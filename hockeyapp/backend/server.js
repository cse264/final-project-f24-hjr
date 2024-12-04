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
    // if (error) throw error;
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    res.json(data);
  } catch (err) {
    console.error('Error fetching players by position:', err);
    next(err);
  }
});

// POST - /teams
app.post('/teams', async (req, res, next) => {
  try {
    console.log(req.body)

    const teamName = req.body.title
    const left = req.body.L 
    const center = req.body.C 
    const right = req.body.R  
    const defense1 = req.body.D 
    const defense2 = req.body.D2

    console.log(`${teamName} + ${left} + ${center} + ${right} + ${defense1} + ${defense2}`)

    if (!teamName || !left || !center || !right || !defense1 || !defense2) {
      return res.status(400).send('Missing required fields: teamName, left, center, right, defense1, defense2');
    }

    const { error } = await supabase
      .from(myTeamsTable)
      .insert([{ teamName: teamName, left: left, center: center, right: right, defense1: defense1, defense2: defense2 }]);

    // Check for errors
    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Return a success response
    res.status(200).json({
      success: true,
      message: 'Team created successfully',
    });

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

// DELETE - /teams/:id
app.delete('/teams/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log('Attempting to delete team with ID:', id);

  try {
    const { error } = await supabase
      .from(myTeamsTable) 
      .delete()
      .eq('teamId', id);  

    if (error) {
      console.error('Error deleting team:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    return res.status(200).json({ message: 'Team deleted successfully' });
  } catch (err) {
    console.error('Error deleting team:', err);
    next(err);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
