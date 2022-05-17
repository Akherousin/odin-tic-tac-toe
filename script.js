const gameBoard = (function () {
  const board = new Array(9);

  const renderBoard = () => {
    board.forEach((item, index) => {
      let boardCell = document.querySelector(`[data-index='${index}']`);
      boardCell.innerText = item;
    });
  };

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

  const setSign = () => {
    currentPlayer ? (sign = player1Sign) : (sign = player2Sign);
  };

  const getCurrentSign = () => {
    return sign;
  };

  const getCurrentPlayer = () => {
    return currentPlayer ? "Player 1" : "Player 2";
  };

  const getNotCurrentPlayer = () => {
    return currentPlayer ? "Player 2" : "Player 1";
  };

  const switchPlayer = () => {
    currentPlayer = !currentPlayer;

    setSign();
  };

  return { getCurrentSign, getCurrentPlayer, switchPlayer };
})();

const game = (function () {
  const checkTheRow = (row) => {
    const [index1, index2, index3] = row;

    if (
      gameBoard.board[index1] === gameBoard.board[index2] &&
      gameBoard.board[index1] === gameBoard.board[index3]
    ) {
      console.log(
        `${player.getCurrentSign()} - current sign, ${player.getCurrentPlayer()} - current player`
      );
      return true;
    }
  };

  const isHorizontalWinner = (index) => {
    const horizontals = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    const rowToCheck = horizontals.find((row) => {
      if (row.includes(index)) return row;
    });

    return checkTheRow(rowToCheck);
  };

  const isVerticalWinner = (index) => {
    const verticals = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    const rowToCheck = verticals.find((row) => {
      if (row.includes(index)) return row;
    });

    return checkTheRow(rowToCheck);
  };

  const isDiagonalWinner = (index) => {
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
  };

  const isWinner = (index) => {
    return (
      isHorizontalWinner(index) ||
      isVerticalWinner(index) ||
      isDiagonalWinner(index)
    );
  };

  const isGameOver = (index) => {
    return gameBoard.board.includes(undefined) && !isWinner(index);
  };

  const fillEmptyCell = (e) => {
    if (!e.target.classList.contains("cell")) return;
    let cell = e.target;
    let cellIndex = +cell.dataset.index;

    if (gameBoard.board[cellIndex] != undefined) return;

    gameBoard.board[cellIndex] = player.getCurrentSign();

    isGameOver(cellIndex);

    player.switchPlayer();
    gameBoard.renderBoard();
  };

  return { fillEmptyCell };
})();

document.addEventListener("click", game.fillEmptyCell);
