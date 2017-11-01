const rows = 10;
const cols = 10;
const minesCount = 30;
const mines = [];

function plantMines() {
  for (let m = 0; m < minesCount; m += 1) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    mines.push([row, col]);
  }
  console.log(`Mines in ${mines}`);
}

function hasMine(row, col) {
  let mine = false;
  mines.forEach((m) => {
    if (m[0] === row && m[1] === col) { mine = true }
  });
  return mine;
}

function countNeighborsMines(row, col) {
  let count = 0;
  if (hasMine(row - 1, col - 1)) { count += 1; }
  if (hasMine(row - 1, col)) { count += 1; }
  if (hasMine(row - 1, col + 1)) { count += 1; }

  if (hasMine(row, col - 1)) { count += 1; }
  if (hasMine(row, col + 1)) { count += 1; }

  if (hasMine(row + 1, col - 1)) { count += 1; }
  if (hasMine(row + 1, col)) { count += 1; }
  if (hasMine(row + 1, col + 1)) { count += 1; }

  return count;
}


function openTile(tile) {
  const row = parseInt(tile.dataset.row);
  const col = parseInt(tile.dataset.col);
  console.log(`clicked in row=${row} col=${col}`);
  tile.classList.remove('unopened');

  if (hasMine(row, col)) {
    tile.classList.add('mine');
  } else {
    const count = countNeighborsMines(row, col);
    if (count === 0) {
      tile.classList.add('opened');
    } else {
      tile.classList.add(`mine-neighbour-${count}`);
    }

  }
}

function makeGrid() {
  const table = document.getElementById('minesweeper');
  for (let i = 0; i < rows; i += 1) {
    const tr = document.createElement('tr');
    for (let j = 0; j < cols; j += 1) {
      const td = document.createElement('td');
      td.classList.add('unopened');
      td.dataset.row = i;
      td.dataset.col = j;

      td.addEventListener('click', (event) => {
        openTile(event.currentTarget);
      });

      tr.appendChild(td);
    }


    table.appendChild(tr);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  plantMines();
  makeGrid();
});
