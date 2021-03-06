const gameBoard = (function () {
  let board = new Array(9);

  function renderBoard() {
    board.forEach((item, index) => {
      let boardCell = document.querySelector(`[data-index='${index}']`);

      item !== undefined
        ? (boardCell.innerText = item)
        : (boardCell.innerText = "");
    });
  }

  return {
    board,
    renderBoard,
  };
})();

const player = (function () {
  let currentPlayer = true;
  const player1Sign = "X";
  const player2Sign = "O";
  let sign = player1Sign;
  let winner = null;
  let player1Score = 0;
  let player2Score = 0;

  function setSign() {
    currentPlayer ? (sign = player1Sign) : (sign = player2Sign);
  }

  function getCurrentSign() {
    return sign;
  }

  function getCurrentPlayer() {
    return currentPlayer ? "Player 1" : "Player 2";
  }

  function switchPlayer() {
    currentPlayer = !currentPlayer;

    setSign();
  }

  function setCurrentPlayer() {
    currentPlayer = true;
  }

  function setWinner(winningPlayer) {
    winner = winningPlayer;
  }

  function getWinner() {
    return winner;
  }

  function setScore() {
    getCurrentPlayer() === "Player 1" ? player1Score++ : player2Score++;
  }

  function getScore() {
    return `${player1Score}:${player2Score}`;
  }

  return {
    getCurrentSign,
    getCurrentPlayer,
    setCurrentPlayer,
    switchPlayer,
    setWinner,
    getWinner,
    setScore,
    getScore,
  };
})();

const game = (function () {
  function checkTheRow(row) {
    const [index1, index2, index3] = row;

    if (
      gameBoard.board[index1] === gameBoard.board[index2] &&
      gameBoard.board[index1] === gameBoard.board[index3]
    ) {
      return true;
    }
  }

  function isHorizontalWinner(index) {
    const horizontals = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    const rowToCheck = horizontals.find((row) => {
      if (row.includes(index)) return row;
    });

    return checkTheRow(rowToCheck);
  }

  function isVerticalWinner(index) {
    const verticals = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    const rowToCheck = verticals.find((row) => {
      if (row.includes(index)) return row;
    });

    return checkTheRow(rowToCheck);
  }

  function isDiagonalWinner(index) {
    const diagonals = [
      [0, 4, 8],
      [2, 4, 6],
    ];

    const rowToCheck = diagonals.find((row) => {
      if (row.includes(index)) {
        return row;
      }
    });

    if (rowToCheck !== undefined) return checkTheRow(rowToCheck);
  }

  function isWinner(index) {
    theWinnerIsFound =
      isHorizontalWinner(index) ||
      isVerticalWinner(index) ||
      isDiagonalWinner(index);

    if (theWinnerIsFound) {
      player.setWinner(player.getCurrentPlayer());
      player.setScore();

      return true;
    }
  }

  function isGameOver(index) {
    return isWinner(index) || !gameBoard.board.includes(undefined);
  }

  function handleGameOver() {
    let popUpEl = document.querySelector(".game-over");
    let messageEl = document.querySelector(".message");
    let scoreEl = document.querySelector(".score");

    scoreEl.innerText = `Score is ${player.getScore()}`;

    messageEl.innerText = player.getWinner()
      ? `${player.getWinner()} has won!`
      : "It is a tie!";

    popUpEl.classList.toggle("hidden");
  }

  function fillEmptyCell(e) {
    if (!e.target.classList.contains("cell")) return;

    let cell = e.target;
    let cellIndex = +cell.dataset.index;

    if (gameBoard.board[cellIndex] != undefined) return;

    gameBoard.board[cellIndex] = player.getCurrentSign();

    if (isGameOver(cellIndex)) {
      handleGameOver();
    }

    player.switchPlayer();
    gameBoard.renderBoard();
  }

  function handleRestart() {
    let popUpEl = document.querySelector(".game-over");
    popUpEl.classList.toggle("hidden");

    gameBoard.board = gameBoard.board.fill(undefined);
    gameBoard.renderBoard();
    player.setWinner(null);
  }

  return { fillEmptyCell, handleRestart };
})();

document.addEventListener("click", game.fillEmptyCell);
document
  .querySelector(".btn-restart")
  .addEventListener("click", game.handleRestart);
