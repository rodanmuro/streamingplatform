import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import CardMovie from '../components/cardmovie/CardMovie';
import { fetchBySearch } from '../redux/moviesSlice';

const MoviesApiTMDB = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.value);
  const catalogo = useSelector((state) => state.catalogo.value);
  
  useEffect( () => {
    dispatch(
      fetchBySearch({
        type: "discover",
        terminoBusqueda: '',
      })
    );
  }, [catalogo]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center py-5">Películas de API TMDB</h2>
        </div>
      </div>
      <div className='container'>
        <div className="row">
          <p className='text-white-50'><b>Nota:</b> Estas películas son traídas directamente de la <b>API The Movie DB</b>, y le permite al usuario administrador
             agregarlas al catálogo que ven los clientes o usuarios desde la plataforma (los datos del Cátalogo se almacenan en una BD de Postgres
             en AWS).
          </p>
        </div>
        <div className="row pt-3 d-flex justify-content-center">
          {movies.map((movie) => ( <CardMovie movie={movie} tipo="agregar" /> ))}
        </div>
      </div>
    </>
  );
}

export default MoviesApiTMDB;
  