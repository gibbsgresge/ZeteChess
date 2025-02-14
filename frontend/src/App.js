import React, { useState } from 'react';
import PlayerSearch from './components/PlayerSearch';
import PlayerStats from './components/PlayerStats';
import RecentGames from './components/RecentGames';
import GameViewer from './components/GameViewer';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [selectedPgn, setSelectedPgn] = useState(null);

  const fetchPlayerData = async (username) => {
    try {
      const statsResponse = await axios.get(`http://localhost:5000/api/stats/${username}`);
      setStats(statsResponse.data);

      const gamesResponse = await axios.get(`http://localhost:5000/api/recent-games/${username}`);
      setRecentGames(gamesResponse.data);
      setSelectedPgn(null);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex flex-col flex-grow items-center justify-center w-full p-6 bg-gray-900 text-gray-300 rounded-lg shadow-lg">
        <PlayerSearch onSearch={fetchPlayerData} />
        
        {stats && <PlayerStats stats={stats} username={username} />}
        
        {recentGames.length > 0 && (
          <RecentGames games={recentGames} onViewGame={(pgn) => setSelectedPgn(pgn)} />
        )}
        
        {selectedPgn && <GameViewer pgn={selectedPgn} />}
      </div>
    </div>
  );
}

export default App;
