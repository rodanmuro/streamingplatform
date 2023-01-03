import React from 'react'
import { useSelector } from "react-redux";

import CardMovie from '../components/cardmovie/CardMovie';

const Catalogo = () => {
  const movies = useSelector((state) => state.catalogo.value);
  const usuario = useSelector((state) => state.user.value);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center py-5">Catálogo de Peliculas</h2>
        </div>
      </div>
      <div className='container'>
        { usuario.role === 'ADMIN' ? (
          <div className="row">
            <p className='text-white-50'><b>Nota:</b> Estas películas son traídas de la tabla <b>"PELICULA_CATALOGO" </b>
             que se amacena en una Base de datos de Postgres en AWS. Y es el mismo catálogo que el usuario o cliente visualiza.
            </p>
          </div>) : '' }
        <div className="row pt-3 d-flex justify-content-center">
          {movies.map((movie) => ( <CardMovie movie={movie} tipo={ usuario.role === 'ADMIN' ? 'eliminar' : 'alquilar'} /> ))}
        </div>
      </div>
    </>
  );
}

export default Catalogo;
  