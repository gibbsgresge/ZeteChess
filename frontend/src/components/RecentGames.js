import React from 'react';

function RecentGames({ games, onViewGame }) {
  return (
    <div className=" mt-8 w-full max-w-xl bg-gray-800 p-6 rounded-lg shadow-lg" >
      <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Recent Games</h2>
      <ul className="space-y-4">
        {games.map((game, index) => (
          <li key={index} className="border-b border-gray-700 pb-2">
            <p>
              <strong>Opponent:</strong>{' '}
              {game.white.username}
            </p>
            <p>
              <strong>Time Control:</strong> {game.time_class}
            </p>
            <p>
              <strong>Date:</strong> {new Date(game.end_time * 1000).toLocaleDateString()}
            </p>
            <button
              onClick={() => onViewGame(game.pgn)}
              className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300"
            >
              View Game
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentGames;
