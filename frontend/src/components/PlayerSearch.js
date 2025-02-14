import React, { useState } from 'react';

function PlayerSearch({ onSearch }) {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    if (username) {
      onSearch(username);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Chess.com Username"
        className="w-64 p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        onClick={handleSearch}
        className="bg-yellow-400 text-black px-6 py-2 rounded-md hover:bg-yellow-300 transition-all"
      >
        Search Player
      </button>
    </div>
  );
}

export default PlayerSearch;
