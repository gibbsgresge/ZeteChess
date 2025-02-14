import React from 'react';

function PlayerStats({ stats, username }) {
  return (
    <div className="mt-8 w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Stats for {username}</h2>
      <div className="space-y-2">
        <p>
          <strong>Rapid Rating:</strong> {stats.chess_rapid ? stats.chess_rapid.last.rating : 'N/A'}
        </p>
        <p>
          <strong>Blitz Rating:</strong> {stats.chess_blitz ? stats.chess_blitz.last.rating : 'N/A'}
        </p>
        <p>
          <strong>Bullet Rating:</strong> {stats.chess_bullet ? stats.chess_bullet.last.rating : 'N/A'}
        </p>
      </div>
    </div>
  );
}

export default PlayerStats;
