import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const GameViewer = ({ pgn }) => {
  const [chess] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  const [moves, setMoves] = useState([]);
  const [currentPosition, setCurrentPosition] = useState('start'); // Default to starting position

  useEffect(() => {
    if (pgn) {
      loadPGN(pgn);
    }
  }, [pgn]);

  const loadPGN = (pgn) => {
    chess.reset();
    chess.loadPgn(pgn);
    const moveHistory = chess.history(); // Get the full list of moves
    setMoves(moveHistory);
    setMoveIndex(0); // Start at the initial position
    setCurrentPosition('start'); // Display the standard board
  };

  const handleBack = () => {
    if (moveIndex > 0) {
      const newIndex = moveIndex - 1;
      chess.reset();
      for (let i = 0; i < newIndex; i++) {
        chess.move(moves[i]);
      }
      setMoveIndex(newIndex);
      setCurrentPosition(chess.fen());
    }
  };

  const handleNext = () => {
    if (moveIndex < moves.length) {
      const newIndex = moveIndex + 1;
      chess.reset();
      for (let i = 0; i < newIndex; i++) {
        chess.move(moves[i]);
      }
      setMoveIndex(newIndex);
      setCurrentPosition(chess.fen());
    }
  };

  return (
    <div className="relative mx-auto max-w-2xl p-6 bg-gray-800 text-gray-300 rounded-lg shadow-lg">
      <div className="mb-4 text-center">
        <p className="text-lg font-bold text-yellow-400">Game Viewer</p>
      </div>

      <div className="mb-4">
        <Chessboard position={currentPosition} boardWidth={600} arePiecesDraggable={false} />
      </div>

      <div className="flex justify-between mt-4 w-full max-w-md">
        <button onClick={handleBack} className="px-6 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition">
          Back
        </button>
        <button onClick={() => loadPGN(pgn)} className="px-6 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition">
          Reset
        </button>
        <button onClick={handleNext} className="px-6 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition">
          Next
        </button>
      </div>
    </div>
  );
};

export default GameViewer;
