class Cell {
  constructor(x, y, options = []) {
    this.x = x;
    this.y = y;
    this.options = options;
    this.collapsed = false;
    this.entropy = this.options.length;
    this.current = false;
  }

  draw() {
    if (this.collapsed) {
      const tile = this.options[0];
      ctx.drawImage(tile.image, this.x, this.y, cellSize, cellSize);
    }
    console.log(this.current);
    if (this.current) {
      ctx.strokeStyle = 'red';
      ctx.strokeRect(this.x, this.y, cellSize, cellSize);
    }
  }

  reverse(str) {
    const arr = str.split('');
    arr.reverse();
    return arr.join('');
  }

  validateOptions(valid, direction) {
    this.options = this.options.filter(
      (tile) => this.reverse(tile.edges[direction]) === valid
    );
    this.entropy = this.options.length;
  }
}
