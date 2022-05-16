const gameBoard = (function () {
  const board = ["x", "x", "x", "o", "o", "o", "x", "x", "x"];

  const renderBoard = () => {
    board.forEach((item, index) => {
      let boardCell = document.querySelector(`[data-index='${index}']`);
      boardCell.textContent = item;
    });
  };

  return {
    renderBoard,
  };
})();

gameBoard.renderBoard();
