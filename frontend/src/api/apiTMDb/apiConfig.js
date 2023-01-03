const apiConfig = {
  apiUrl: "https://api.themoviedb.org/3",
  apiKey: "04d1bacfe90a25350330665d5f18d1fa",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  imageW500: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  URL_IMAGE: "https://image.tmdb.org/t/p/original",
};

export default apiConfig;
