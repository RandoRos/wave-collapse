const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 300;

const imgData = [
  {
    src: './tiles/Grass00.png',
    edges: ['000', '000', '000', '000'],
  },
  {
    src: './tiles/Road20.png',
    edges: ['010', '010', '000', '000'],
  },
  {
    src: './tiles/Road0.png',
    edges: ['111', '111', '111', '111'],
  },
  {
    src: './tiles/Road33.png',
    edges: ['000', '011', '111', '110'],
  },
  {
    src: './tiles/Road12.png',
    edges: ['011', '111', '110', '000'],
  },
  {
    src: './tiles/Road13.png',
    edges: ['110', '000', '011', '111'],
  },
];

const cellSize = 100;
const grid = [];

let tiles = [];
let frame = 1;

const init = async () => {
  tiles = await generateTiles(imgData);
  console.log(tiles);
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

  if (newCell.options.length === 0) {
    return;
  }

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
      grid[i].validateOptions(newCell.options[0].edges.top, 'down');
    }

    // check right
    if (
      newCell.x + cellSize <= canvas.width &&
      newCell.x + cellSize === grid[i].x &&
      newCell.y === grid[i].y
    ) {
      grid[i].validateOptions(newCell.options[0].edges.right, 'left');
    }

    // check down
    if (
      newCell.y + cellSize <= canvas.height &&
      newCell.x === grid[i].x &&
      newCell.y + cellSize === grid[i].y
    ) {
      grid[i].validateOptions(newCell.options[0].edges.down, 'top');
    }

    // check left
    if (
      newCell.x - cellSize >= 0 &&
      newCell.x - cellSize === grid[i].x &&
      newCell.y === grid[i].y
    ) {
      grid[i].validateOptions(newCell.options[0].edges.left, 'right');
    }
  }
};

const gameloop = () => {
  if (frame < 10 && grid.filter((tile) => !tile.collapsed).length > 0) {
    requestAnimationFrame(gameloop);
  }
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
