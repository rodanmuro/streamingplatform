/* toma el objeto movie que viene de la API con los parámetros que 
se muestran a continuación y devuleve un objeto JSON normalizado
para ser guardado posteriormente en {results:[]} */
export const movieAJson= (movie)=>{
    const movieJson = {
        id: movie['idPelicula'] === undefined ? movie.id : movie.idPelicula,
        poster_path: movie.poster_path,
        title: movie.title,
        release_date: movie.release_date,
        original_language: movie.original_language,
        vote_average: movie.vote_average,
        overview: movie.overview,
      };
      
      return movieJson;
}
