const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const cellSize = 100;
const grid = [];
const imageSrcs = [
  './tiles/Grass00.png',
  './tiles/Road20.png',
  './tiles/Road21.png',
  './tiles/Road0.png',
];

let images = [];
let tiles = [];
let isDoneDebug = false;

const init = async () => {
  images = await preload(imageSrcs);

  tiles = [
    new Tile(images[0], [0, 0, 0, 0]),
    new Tile(images[1], [1, 1, 0, 0]),
    new Tile(images[2], [0, 1, 1, 0]),
    new Tile(images[3], [1, 1, 1, 1]),
  ];
};

const createGrid = () => {
  for (let i = 0; i < canvas.width; i += cellSize) {
    for (let j = 0; j < canvas.height; j += cellSize) {
      grid.push(new Cell(i, j, tiles));
    }
  }
};

const waveCollapse = () => {
  // Find cell with min etropy
  const gridCpy = [...grid];
  gridCpy.sort((a, b) => a.entropy - b.entropy);

  const filtered = grid.filter(
    (cell) => !cell.collapsed && cell.entropy === gridCpy[0].entropy
  );
  const idx = Math.floor(Math.random() * filtered.length);

  const newCell = filtered[idx];

  newCell.collapsed = true;
  newCell.entropy = 0;
  newCell.options = [
    newCell.options[Math.floor(Math.random() * newCell.options.length)],
  ];

  // Check neighbors
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].collapsed) {
      continue;
    }

    // check top
    if (
      newCell.y - cellSize >= 0 &&
      newCell.x === grid[i].x &&
      newCell.y - cellSize === grid[i].y
    ) {
      console.log('top', grid[i]);
    }

    // check right
    if (
      newCell.x + cellSize <= canvas.width &&
      newCell.x + cellSize === grid[i].x &&
      newCell.y === grid[i].y
    ) {
      console.log('right', grid[i]);
    }

    // check down
    if (
      newCell.y + 100 <= canvas.height &&
      newCell.x === grid[i].x &&
      newCell.y + 100 === grid[i].y
    ) {
      console.log('down', grid[i]);
    }

    // check left
    if (
      newCell.x - cellSize >= 0 &&
      newCell.x - cellSize === grid[i].x &&
      newCell.y === grid[i].y
    ) {
      console.log('left', grid[i]);
    }
  }

  // isDoneDebug = true;

  // console.table(grid);
};

// const isDone = isDoneDebug; //|| !isDoneDebug && grid.filter((tile) => !tile.collapsed).length > 0;
const isDone = grid.filter((tile) => !tile.collapsed).length > 0;

const gameloop = () => {
  console.log('check is done', isDoneDebug);
  if (isDone) requestAnimationFrame(gameloop);
  waveCollapse();
  grid.forEach((cell) => {
    cell.draw();
  });
};

let id;
init().then(() => {
  createGrid();
  gameloop();
});
