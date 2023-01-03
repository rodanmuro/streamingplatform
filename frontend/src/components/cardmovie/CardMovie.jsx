import React from "react";
import './CardMovie.css';
import iconReproductor from '../../assets/icon-reproductor.png';
import { useDispatch } from "react-redux";

import apiConfig from '../../api/apiTMDb/apiConfig'
import Alquilar from "../alquilar/Alquilar";
import Devolver from "../devolver/Devolver";
import { movieAJson } from "../../api/apiTMDb/utils";
import { fetchMovie } from '../../redux/movieSlice';

const CardMovie = ({ movie, tipo }) => {
  const dispatch = useDispatch();

  let id = movie['idPelicula'] === undefined ? movie.id : movie.idPelicula;

  const selectMovie = (id) => {
    dispatch(
      fetchMovie(id)
    );
    if(tipo === 'devolver')
      window.scrollTo(0, 0);
  };
  
  let tipoBoton;

  if(tipo === "alquilar" || tipo === "agregar")
    tipoBoton = <Alquilar key={id+"_alquilar"} movie={movieAJson(movie)}/>

  if(tipo === "devolver" || tipo === "eliminar")
    tipoBoton = <Devolver key={id+"_devolver"} movie={movieAJson(movie)}/>

  return (
    <div 
      key={id} 
      className="col-10 col-xs-9 col-sm-9 col-md-6 col-lg-4 d-flex justify-content-center mb-5 position-relative seccion-cardmovie"
    >

      <div className="border">
        <div className="">
          {tipo == 'devolver' ? <img src={ iconReproductor } className='icon-play' onClick={ () => selectMovie(id)} /> : ''}
          <img
            src={`${apiConfig.URL_IMAGE + movie.poster_path}`}
            alt={movie.title}
            className='img-movie'
          />
        </div>
      
        {tipoBoton}
      
        <div className="px-3 pt-2">
          <h2 className="pt-3">{`${movie.title} (${movie.release_date})`}</h2>
          <h5>Idioma: {movie.original_language}</h5>
          <h5>Calificación: {`${movie.vote_average} / 10`}</h5>
          <p className="text-justify" style={{ fontSize: 14 }}>
            {" "}
            <b style={{ fontSize: 18 }}>Descripción:</b> {movie.overview}
          </p>
        </div>
      </div>

    </div>
  );
};

export default CardMovie;
