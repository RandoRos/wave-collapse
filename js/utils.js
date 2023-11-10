const preload = (urls) => {
  const promises = urls.map((url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  });

  return Promise.all(promises);
};

const generateTiles = (data) => {
  const promises = data.map((image) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(new Tile(img, new Edge(...image.edges)));
      img.onerror = reject;
      img.src = image.src;
    });
  });

  return Promise.all(promises);
};
