import apiConfig from "./apiConfig";
import axios from "axios";

const apiTmdb = {
    // Método para obtener la lista de películas
    getListMovies: async (propiedades) => {
      const { data: { results }, } = await axios.get(`${apiConfig.apiUrl}/${propiedades.type}/movie`, {
        params: {
          api_key: apiConfig.apiKey,
          query: propiedades.terminoBusqueda,
          page: 1
        }
      });

      return results;
    },
    // Método para obtener una única película
    getMovie: async (id) => {
      const { data } = await axios.get(`${apiConfig.apiUrl}/movie/${id}`, {
        params: {
          api_key: apiConfig.apiKey,
          append_to_response: 'videos'
        }
      });

      return data;
    }
}

export default apiTmdb;