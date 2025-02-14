// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Route to fetch Chess.com player stats
app.get('/api/stats/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const response = await axios.get(`https://api.chess.com/pub/player/${username}/stats`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats from Chess.com', error: error.message });
  }
});


// Route to fetch Chess.com player stats
app.get('/api/recent-games/:username', async (req, res) => {
  const username = req.params.username;
  try {
    // Fetch the most recent archive link
    const archivesResponse = await axios.get(`https://api.chess.com/pub/player/${username}/games/archives`);
    const recentArchive = archivesResponse.data.archives.pop(); // Get the latest archive URL

    // Fetch games from the most recent archive
    const gamesResponse = await axios.get(recentArchive);
    res.json(gamesResponse.data.games.slice(-5)); // Return the last 5 games
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent games', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
