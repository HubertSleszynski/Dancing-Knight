import { useState } from "react";
import "../style.css";

const VISITED = "VISITED";
const CURRENT = "CURRENT";
const UNVISITABLE = "UNVISITABLE";
const VISITABLE = "VISITABLE";
const INITIAL_BOARD_SIZE = 8;
const INITIAL_BOARD = [
  [
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
  ],
  [
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
  ],
  [
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
  ],
  [
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
  ],
  [
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
  ],
  [
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
  ],
  [
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
  ],
  [
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
    VISITABLE,
  ],
];

const DancingKnight = () => {
  const [row, setRow] = useState(null);
  const [col, setCol] = useState(null);
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [helpClicked, setHelpClicked] = useState(false);

  const isValid = (r, c) => {
    return (
      r >= 0 &&
      r < INITIAL_BOARD_SIZE &&
      c >= 0 &&
      c < INITIAL_BOARD_SIZE &&
      board[r][c] !== VISITED
    );
  };

  const resetBoard = () => {
    setRow(null);
    setCol(null);
    const cpyBoard = [];
    for (let i = 0; i < INITIAL_BOARD_SIZE; i++) {
      cpyBoard.push([]);
      for (let j = 0; j < INITIAL_BOARD_SIZE; j++) {
        cpyBoard[i].push(VISITABLE);
      }
    }
    setBoard(cpyBoard);
  };

  const successorFunction = (r, c) => {
    const possibleMoves = [];
    if (isValid(r + 2, c + 1)) possibleMoves.push([r + 2, c + 1]);
    if (isValid(r - 2, c - 1)) possibleMoves.push([r - 2, c - 1]);
    if (isValid(r - 2, c + 1)) possibleMoves.push([r - 2, c + 1]);
    if (isValid(r + 2, c - 1)) possibleMoves.push([r + 2, c - 1]);
    if (isValid(r + 1, c + 2)) possibleMoves.push([r + 1, c + 2]);
    if (isValid(r - 1, c - 2)) possibleMoves.push([r - 1, c - 2]);
    if (isValid(r + 1, c - 2)) possibleMoves.push([r + 1, c - 2]);
    if (isValid(r - 1, c + 2)) possibleMoves.push([r - 1, c + 2]);
    return possibleMoves;
  };

  const applySuccessors = successors => {
    // remove previous successors
    for (let i = 0; i < INITIAL_BOARD_SIZE; i++) {
      for (let j = 0; j < INITIAL_BOARD_SIZE; j++) {
        if (board[i][j] === VISITABLE) {
          board[i][j] = UNVISITABLE;
        }
      }
    }
    // add new successors to board
    successors.forEach(successor => {
      board[successor[0]][successor[1]] = VISITABLE;
    });
  };

  const makeMove = (r, c) => {
    if (board[r][c] === VISITABLE) {
      if (row != null && col != null) board[row][col] = VISITED;
      board[r][c] = CURRENT;
      const successors = successorFunction(r, c);
      applySuccessors(successors);
      setRow(r);
      setCol(c);
    }
  };

  return (
    <div className="container">
      <h1>Dancing Knight</h1>
      <div className="buttons">
        <button className="btn" onClick={() => setHelpClicked(!helpClicked)}>
          Help
        </button>
        <button className="btn" onClick={() => resetBoard()}>
          Reset
        </button>
      </div>
      {helpClicked ? (
        <div className="help">
          <h2>What is this game about?</h2>
          <p>
            Dancing knight is a type of mathematical puzzle involving moving a
            knight around a chessboard in such a way that it visits every square
            exactly once. The knight's movement is restricted - it moves two
            squares in one direction and one square in another direction,
            forming an "L" shape.
          </p>
        </div>
      ) : null}
      <div className="board">
        {board.map((row, i) => {
          return row.map((state, j) => {
            let key = `${i}${j}`;
            return (
              <div
                key={key}
                className={`${
                  state === VISITABLE
                    ? "visitable"
                    : state === UNVISITABLE
                    ? "unvisitable"
                    : state === CURRENT
                    ? "current"
                    : state === VISITED
                    ? "visited"
                    : null
                } square`}
                onClick={() => makeMove(i, j)}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default DancingKnight;
