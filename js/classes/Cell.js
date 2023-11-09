class Cell {
  constructor(x, y, options = []) {
    this.x = x;
    this.y = y;
    this.options = options;
    this.collapsed = false;
    this.entropy = this.options.length;
  }

  draw() {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, cellSize, cellSize);
    if (this.collapsed) {
      const tile = this.options[0];
      ctx.drawImage(tile.image, this.x, this.y, cellSize, cellSize);
    }
  }
}
