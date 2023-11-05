import { useCallback, useEffect, useState } from 'react';
import { calculateWinner, sleep, randomMove } from '../utils'
import "./Game.css"

export default function Game() {
    // Initial Square as [null, null, null, null, null, null, null, null, null]
    const [squares, setSquares] = useState(Array(9).fill(null));

    // Is user turn flag
    const [userTurn, setUserTurn] = useState(true);

    // Display status
    const [status, setStatus] = useState("Your turn!");

    // Is game over flag
    const [gameOver, setGameOver] = useState(false);


    // TODO: Handle on user click

    // TODO: Calculate winner and handle robot moving

    return (
        <div className='game'>
            <div className="status">{status}</div>
            <div className={`game-board ${gameOver && "game-board--end"}`}>
                {/* Render game board matrix */}
            </div>
        </div>
    );
}
