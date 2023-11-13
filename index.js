const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const DIM = 10;

const cellSize = canvas.width / DIM;
const grid = [];

let tiles = [];
let frame = 1;
let clickStop = 1;

const init = async () => {
  tiles = await generateTiles(summerTileset);
  console.log(tiles);
};

const createGrid = () => {
  for (let i = 0; i < canvas.width; i += cellSize) {
    for (let j = 0; j < canvas.height; j += cellSize) {
      grid.push(new Cell(i, j, tiles));
    }
  }
};

const createNeighbors = () => {
  grid.forEach((c, i) => {
    if (c.x > 0) c.neighbors.set('left', grid[i - DIM]);
    if (c.x < canvas.width - cellSize) c.neighbors.set('right', grid[i + DIM]);
    if (c.y > 0) c.neighbors.set('top', grid[i - 1]);
    if (c.y < canvas.height - cellSize) c.neighbors.set('down', grid[i + 1]);
  });
};

const findRandomTile = (tiles) => {
  const weights = [tiles[0].weight || 5];

  for (let i = 1; i < tiles.length; i++) {
    weights[i] = (tiles[i].weight || 5) + weights[i - 1];
  }

  const random = Math.random() * weights[weights.length - 1];

  for (let i = 0; i < weights.length; i++)
    if (weights[i] > random) {
      return tiles[i];
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

  if (!newCell || newCell.options.length === 0) {
    return;
  }

  newCell.collapsed = true;
  newCell.entropy = -1;
  newCell.current = true;

  // newCell.options = [
  //   newCell.options[Math.floor(Math.random() * newCell.options.length)],
  // ];

  newCell.options = [findRandomTile(newCell.options)];

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

const waveCollapse2 = () => {
  const gridCpy = [...grid].filter((cell) => !cell.collapsed);
  gridCpy.sort((a, b) => a.entropy - b.entropy);

  const filtered = gridCpy.filter(
    (cell) => !cell.collapsed && cell.entropy === gridCpy[0].entropy
  );

  const idx = Math.floor(Math.random() * filtered.length);
  const cell = filtered[idx];

  if (!cell || cell.options.length === 0) {
    return;
  }

  cell.collapsed = true;
  cell.entropy = -1;
  cell.current = true;
  cell.options = [findRandomTile(cell.options)];

  const stack = [];
  stack.push(cell);

  while (stack.length) {
    const el = stack.pop();
    if (el.neighbors.has('left')) {
      const left = el.neighbors.get('left');
      if (!left.collapsed) {
        el.options.forEach((op) => {
          left.validateOptions(op.edges.left, 'right');
        });
        if (left.options.length < tiles.length) {
          stack.push(left);
        }
        left.validate2(el.options, 'right');
      }
    }
  }

  // Check neighbors
  // if (cell.neighbors.has('left')) {
  //   cell.neighbors
  //     .get('left')
  //     .validateOptions(cell.options[0].edges.left, 'right');
  // }
  // if (cell.neighbors.has('right')) {
  //   cell.neighbors
  //     .get('right')
  //     .validateOptions(cell.options[0].edges.right, 'left');
  // }
  // if (cell.neighbors.has('top')) {
  //   cell.neighbors
  //     .get('top')
  //     .validateOptions(cell.options[0].edges.top, 'down');
  // }
  // if (cell.neighbors.has('down')) {
  //   cell.neighbors
  //     .get('down')
  //     .validateOptions(cell.options[0].edges.down, 'top');
  // }
};

const clearCurrect = () => {
  grid.forEach((cell) => (cell.current = false));
};

const gameloop = () => {
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if (grid.filter((tile) => !tile.collapsed).length > 0) {
    //   requestAnimationFrame(gameloop);
    // }
    //waveCollapse();
    waveCollapse2();
    grid.forEach((cell) => {
      cell.draw();
    });
    clearCurrect();
    frame++;
  }, 0);
};

init().then(() => {
  createGrid();
  createNeighbors();
  gameloop();
});

window.addEventListener('click', (event) => {
  gameloop();
});
