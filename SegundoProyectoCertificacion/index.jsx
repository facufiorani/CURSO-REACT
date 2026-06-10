const { useState } = React;

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isX, setIsX] = useState(true);

    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(s => s !== null);

    function handleClick(index) {
        if (squares[index] || winner || isDraw) return;

        const newSquares = squares.map((val, i) =>
            i === index ? (isX ? "X" : "O") : val
        );
        setSquares(newSquares);
        setIsX(!isX);
    }

    function handleReset() {
        setSquares(Array(9).fill(null));
        setIsX(true);
    }

    return (
        <div className="game">
            <h1 className="title">Tic Tac Toe</h1>
            {winner && <p className="status">Winner: {winner}</p>}
            {isDraw && <p className="status">¡Empate!</p>}
            {!winner && !isDraw && <p className="turn">Turno: {isX ? "X" : "O"}</p>}
            <div className="board" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                {squares.map((value, index) => (
                    <button key={index} className="square" onClick={() => handleClick(index)}>
                        {value}
                    </button>
                ))}
            </div>
            <button id="reset" className="reset" onClick={handleReset}>Resetear</button>
        </div>
    );
}
