class Tile {
  constructor(image, weight, edges = {}, rotation) {
    this.image = image;
    this.edges = edges;
    this.rotation = rotation;
    this.weight = weight
  }

  rotate(num = 1) {
    const newEdges = new Array(4);

    const arr = Object.keys(this.edges);
    for (let i = 0; i < arr.length; i++) {
      newEdges[(i + num) % 4] = this.edges[arr[i]];
    }

    return new Tile(this.image, this.weight, new Edge(...newEdges), num * 90);
  }
}
