import {
  URL_BASE,
  ENDPOINT_LOGIN,
  ENDPOINT_LOGOUT,
  ENDPOINT_PELICULA_ALQUILADA,
  ENDPOINT_PELICULA_CATALOGO,
  ENDPOINT_REGISTRO,
  ENDPOINT_ROLE,
  ENDPOINT_LOGGED,
  ENDPOINT_DATAUSER,
} from "./apiConfig";

import axios from "axios";
import sweetAlert from "../apiFirebase/sweetAlert";

/**
 * Consulta el endpoint de registro. Agrega un usuario a la tabla Usuario de la base de datos
 * @param {string} email
 * @param {string} password
 * @param {string} nombre
 * @param {string} role Debe tomar los valores ADMIN y USER
 * @returns {json} {email:email, nombre:nombre, role:role} o bien la palabra "duplicado" en caso que el usuario ya exista
 */
export async function registrar(email, password, nombre, role) {
  let dataUser = await axios.post(URL_BASE + ENDPOINT_REGISTRO, {
    email: email,
    password: password,
    nombre: nombre,
    role: role,
  });

  console.log(dataUser.data);
  return dataUser.data;
}

/**
 * Consulta el endpoint de login. Crea una cookie de sesión autenticada en el servidor
 * @param {string} email
 * @param {string} password
 * @returns {json} {email:email, nombre:nombre, role:role}
 * si el usuario no está registrado se devuelve la cadena "usuario no existe"
 * si el password es incorrecto, se devuelve la cadena "password incorrecto"
 */
export async function login(email, password) {
  let dataUser = await axios
    .post(
      URL_BASE + ENDPOINT_LOGIN,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );

    console.log(dataUser.data);
    
    if(dataUser.data=="usuario no existe"){
      sweetAlert.showErrores(dataUser.data);
    }
    if(dataUser.data=="password incorrecto"){
      sweetAlert.showErrores(dataUser.data);
    }
    

    return dataUser.data;
}

/**
 * Se obtienen todas las películas guardadas en la tabla PeliculaCatalogo
 * No requere parámetros; sólo puede consultarse por usuarios logueados
 * @returns {json} de la forma {"results":[propspeli1, propspeli2....]}
 */
export async function obtenerPeliculasCatalogo() {
  let peliculas = await axios.get(URL_BASE + ENDPOINT_PELICULA_CATALOGO, {
    withCredentials: true,
  });

  
  if(peliculas.data==""){
    return [];
  }
  
  return peliculas.data;
}

/**
 *
 * @param {number} idPelicula
 * @param {string} poster_path
 * @param {string} title
 * @param {string} release_date
 * @param {string} original_language
 * @param {string} vote_average
 * @param {string} overview
 *
 * @returns {json} si la película fue agregada exitosamente, devuelve un json con los parámetros
 * {idPelicula,
 * poster_path,
 * title,
 * release_date,
 * original_language,
 * vote_average,
 * overview}
 *
 * en caso contrario, devuelve la cadena "duplicada"
 *
 */
export async function agregarPeliculaCatalogo({ id, poster_path, title, release_date, original_language, vote_average, overview }) {
  let response = await axios.post( URL_BASE + ENDPOINT_PELICULA_CATALOGO, {
        idPelicula: id,
        poster_path: poster_path,
        title: title,
        release_date: release_date,
        original_language: original_language,
        vote_average: vote_average,
        overview: overview.slice(0,255),
      },
      {
        withCredentials: true,
      }
    );

    console.log(response.data);
    return response.data;
}

/**
 * Borra una película del católogo
 * @param {number} idPelicula
 * @returns {json} con los parámetros {estado:borrada,idPelicula} en la clave
 */
export async function borrarPeliculaCatalogo( {id} ) {
  
  let res = await axios.delete(
    URL_BASE + ENDPOINT_PELICULA_CATALOGO + "?idPelicula=" +id,
    {
      withCredentials: true,
    }
  );

  console.log(res.data);
  return res.data;
}

/**
 * Se obtienen las películas alquiladas para un usuario.
 * El servidor se encarga de determinar, cuál es el usuario mediante
 * la cookie JSESSION enviada desde el navegador cliente
 * @returns {json} de la forma {"results":[propspeli1, propspeli2....]}
 */
export async function obtenerPeliculasAlquiladas() {
  let peliculas = await axios.get(URL_BASE + ENDPOINT_PELICULA_ALQUILADA, {
    withCredentials: true,
  });

  if (peliculas.data == "") {
    peliculas.data = [];
  }
  //console.log(peliculas.data);
  return peliculas.data;
}

/**
 *
 * @param {number} idPelicula
 * @returns {json} si se guarda exitosamente, de la forma
 * {
 *   "estado": "guardada",
 *   "idPelicula": 1
 * }
 *
 * de lo contrario
 * devuelve una cadena que dice "duplicada"
 */
export async function agregarPeliculaAlquilada(idPelicula) {
  let res = await axios.post(
    URL_BASE + ENDPOINT_PELICULA_ALQUILADA,
    {
      idPelicula: idPelicula,
    },
    {
      withCredentials: true,
    }
  );

  console.log(res.data);
  return res.data;
}

/**
 * Borra una película alquilada, por su idAlquilada, según el usuario logueado
 * @param {number} idAlquilada la cual es diferente al idPelicula
 * @returns {json} de la forma
 * {
 *   "estado": "borrada",
 *   "idAlquilada": 1
 * }
 */

export async function borrarPeliculaAlquilada(idPelicula) {
  
  let res = await axios
    .delete(
      URL_BASE + ENDPOINT_PELICULA_ALQUILADA + "/?idPelicula=" + idPelicula,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
    return res.data;
}


/**
 * Devuelve una cadena con el role del usuario logueado.
 * @returns {string} puede ser ADMIN o USER
 */
export async function role() {
  let role = await axios.get(URL_BASE + ENDPOINT_ROLE, {
    withCredentials: true,
  });
  console.log(role.data);
  return role.data;
}

/**
 * Cierra la sesión del usuario en el servidor
 * @return {string} logout
 */
export async function logout() {
  let logout = await axios.get(URL_BASE + ENDPOINT_LOGOUT, {
    withCredentials: true,
  });

  console.log(logout.data);
  return logout.data;
}

/**
 * Determina si un usuario está logueado
 * @async
 * @returns {Promise<boolean>} cadena
 */
export async function isLogged() {
  let res = await axios.get(URL_BASE + ENDPOINT_LOGGED, {
    withCredentials: true,
  });

  console.log(res.data);
  return res.data;
}

/**
 * Devuelve los datos del usuario logueado
 * @returns {json} json con la siguiente estructura {"role":"USER","nombre":"nombreUser","email":"user"}
 */
export async function getDataUser() {
  let dataUSer = await axios.get(URL_BASE + ENDPOINT_DATAUSER, {
    withCredentials: true,
  });

  console.log(dataUSer.data);
  return dataUSer.data;
}
