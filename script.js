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

  const switchPlayer = () => {
    currentPlayer = !currentPlayer;

    setSign();
  };

  return { getCurrentSign, switchPlayer };
})();

const game = (function () {
  const fillEmptyCell = (e) => {
    if (!e.target.classList.contains("cell")) return;
    let cell = e.target;
    let cellIndex = +cell.dataset.index;

    if (gameBoard.board[cellIndex] != undefined) return;

    gameBoard.board[cellIndex] = player.getCurrentSign();
    player.switchPlayer();
    gameBoard.renderBoard();
  };

  return { fillEmptyCell };
})();

document.addEventListener("click", game.fillEmptyCell);
