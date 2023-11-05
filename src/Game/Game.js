import { useCallback, useEffect, useState } from 'react';
import { calculateWinner, sleep, randomMove } from '../utils'
import "./Game.css"

const Square = ({ value, onSquareClick }) => {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default function Game() {
    // Initial Square as [null, null, null, null, null, null, null, null, null]
    const [squares, setSquares] = useState(Array(9).fill(null));

    // Is user turn flag
    const [userTurn, setUserTurn] = useState(true);

    // Display status
    const [status, setStatus] = useState("Your turn!");

    // Is game over flag
    const [gameOver, setGameOver] = useState(false);


    // Handle on user click
    const handleClick = useCallback((i) => () => {
        if (gameOver || squares[i] || !userTurn) {
            return;
        }
        squares[i] = 'X';
        setUserTurn(false)
        setSquares([...squares]);
    }, [squares, gameOver, userTurn])

    // Calculate winner and handle robot moving
    useEffect(() => {
        const win = calculateWinner(squares);
        let status
        let over = false
        if (win != null) {
            status = win ? "You Win!" : "You Lose...";
            over = true
        } else {
            status = userTurn ? "Your turn!" : "Wait..."
        }
        setStatus(status)
        setGameOver(over)

        const handleRobotMove = async () => {
            await sleep(1000)
            const randomIndex = randomMove(squares)
            squares[randomIndex] = 'O';
            setSquares([...squares]);
            setUserTurn(true)
        }
        if (!userTurn && !over) {
            handleRobotMove()
        }
    }, [userTurn, squares])


    return (
        <div className='game'>
            <div className="status">{status}</div>
            <div className={`game-board ${gameOver && "game-board--end"}`}>
                {/* Render game board matrix */}
                {squares.map((square, index) => {
                    return <Square key={index} value={square} onSquareClick={handleClick(index)} />
                })}
            </div>
        </div>
    );
}
