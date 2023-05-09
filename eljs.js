let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const squares = document.querySelectorAll('.square');
const resetButton = document.querySelector('#reset');

// Agregar un manejador de eventos para cada casilla
squares.forEach((square) => {
  square.addEventListener('click', handleClick);
});

// Agregar un manejador de eventos para el botón de reinicio
resetButton.addEventListener('click', resetGame);

// Función para manejar los clics del usuario
function handleClick(event) {
  const square = event.target;
  const index = square.id;
  
  // Si la casilla ya está marcada, salimos de la función
  if (board[index] !== '') return;
  
  // Marcamos la casilla con el símbolo del jugador actual
  board[index] = currentPlayer;
  square.textContent = currentPlayer;
  
  // Verificar si hay un ganador
  const winner = checkWinner();
  if (winner) {
    alert(`¡${winner} ha ganado!`);
    resetBoard();
    return;
  }
  
  // Si no hay ganador, verificamos si hay empate
  if (checkTie()) return;
  
  // Si no hay ganador ni empate, cambiamos al siguiente jugador
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Función para reiniciar el tablero
function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  squares.forEach((square) => {
    square.textContent = '';
  });
  currentPlayer = 'X';
}

// Función para reiniciar el juego completo
function resetGame() {
  resetBoard();
  alert('¡Juego reiniciado!');
}

// Función para verificar si el tablero está lleno
function isBoardFull() {
  return board.every((square) => square !== '');
}

// Función para verificar si hay un empate
function checkTie() {
  if (isBoardFull()) {
    alert('¡Empate!');
    resetBoard();
    return true;
  }
  return false;
}

// Función para verificar si hay un ganador
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
      return board[a];
    }
  }
  return null;
}
