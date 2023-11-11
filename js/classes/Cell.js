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
      ctx.imageSmoothingEnabled = false;
      // ctx.globalAlpha = 0.6;

      if (tile.rotation) {
        ctx.save();
        ctx.translate(this.x + cellSize / 2, this.y + cellSize / 2);
        ctx.rotate((tile.rotation * Math.PI) / 180);
        ctx.translate(-this.x - cellSize / 2, -this.y - cellSize / 2);
        ctx.drawImage(tile.image, this.x, this.y, cellSize, cellSize);
        ctx.restore();
      } else {
        ctx.drawImage(tile.image, this.x, this.y, cellSize, cellSize);
      }

      // ctx.fillStyle = 'yellow';
      // ctx.font = '20px Areal';
      // ctx.fillText(tile.edges.top, this.x + cellSize / 2, this.y + 20);

      // ctx.fillStyle = 'yellow';
      // ctx.font = '20px Areal';
      // ctx.fillText(tile.edges.down, this.x + cellSize / 2, this.y + cellSize - 10);
    }

    if (this.current) {
      ctx.strokeStyle = 'red';
      ctx.strokeRect(this.x, this.y, cellSize, cellSize);
    }

    if (!this.collapsed) {
      ctx.fillStyle = 'black';
      ctx.font = '10px Areal';
      ctx.fillText(this.entropy, this.x + cellSize / 2, this.y + cellSize / 2);
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
