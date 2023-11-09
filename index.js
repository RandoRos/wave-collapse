const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;

const cellSize = 100;
const grid = [];
const imageSrcs = [
  './tiles/Grass00.png',
  './tiles/Road20.png',
  './tiles/Road21.png',
  './tiles/Road11.png',
  './tiles/Road22.png',
  './tiles/Road31.png',
  './tiles/Road23.png',
];

let images = [];
let tiles = [];
let isDoneDebug = false;
let frame = 1;

const init = async () => {
  images = await preload(imageSrcs);

  tiles = [
    new Tile(images[0], [0, 0, 0, 0]),
    new Tile(images[1], [1, 1, 0, 0]),
    new Tile(images[2], [0, 1, 1, 0]),
    new Tile(images[3], [1, 0, 1, 0]),
    new Tile(images[4], [0, 0, 1, 1]),
    new Tile(images[5], [0, 1, 0, 1]),
    new Tile(images[6], [1, 0, 0, 1]),
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
  const gridCpy = [...grid].filter((cell) => !cell.collapsed);
  gridCpy.sort((a, b) => a.entropy - b.entropy);

  const filtered = gridCpy.filter(
    (cell) => !cell.collapsed && cell.entropy === gridCpy[0].entropy
  );
  const idx = Math.floor(Math.random() * filtered.length);

  const newCell = filtered[idx];
  newCell.collapsed = true;
  newCell.entropy = -1;
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
      // console.log('top', grid[i]);
      grid[i].options = grid[i].options.filter(
        (tile) => tile.edges[2] === newCell.options[0].edges[0]
      );
      grid[i].entropy = grid[i].options.length;
    }

    // check right
    if (
      newCell.x + cellSize <= canvas.width &&
      newCell.x + cellSize === grid[i].x &&
      newCell.y === grid[i].y
    ) {
      // console.log('right', grid[i]);
      grid[i].options = grid[i].options.filter(
        (tile) => tile.edges[3] === newCell.options[0].edges[1]
      );
      grid[i].entropy = grid[i].options.length;
    }

    // check down
    if (
      newCell.y + 100 <= canvas.height &&
      newCell.x === grid[i].x &&
      newCell.y + 100 === grid[i].y
    ) {
      // console.log('down', grid[i]);
      grid[i].options = grid[i].options.filter(
        (tile) => tile.edges[0] === newCell.options[0].edges[2]
      );
      grid[i].entropy = grid[i].options.length;
    }

    // check left
    if (
      newCell.x - cellSize >= 0 &&
      newCell.x - cellSize === grid[i].x &&
      newCell.y === grid[i].y
    ) {
      // console.log('left', grid[i]);
      grid[i].options = grid[i].options.filter(
        (tile) => tile.edges[1] === newCell.options[0].edges[3]
      );
      grid[i].entropy = grid[i].options.length;
    }
  }
};

// const isDone = isDoneDebug; //|| !isDoneDebug && grid.filter((tile) => !tile.collapsed).length > 0;
// const isDone = () => grid.filter((tile) => !tile.collapsed).length > 0;

const gameloop = () => {
  if (grid.filter((tile) => !tile.collapsed).length > 0)
    requestAnimationFrame(gameloop);
  waveCollapse();
  grid.forEach((cell) => {
    cell.draw();
  });
  frame++;
};

init().then(() => {
  createGrid();
  gameloop();
});
