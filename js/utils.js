const generateTiles = async (data) => {
  const promises = [];

  data.forEach((image) => {
    promises.push(
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const tile = new Tile(img, new Edge(...image.edges));
          const result = [];
          result.push(tile);

          if (image.rotation) {
            result.push(tile.rotate(1));
            result.push(tile.rotate(2));
            result.push(tile.rotate(3));
          }

          resolve([...result]);
        };
        img.onerror = reject;
        img.src = image.src;
      })
    );
  });

  const r = await Promise.all(promises);
  return r.flat();
};
