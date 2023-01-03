import React from 'react';
import { useSelector} from "react-redux";

import CardMovie from '../components/cardmovie/CardMovie';
import Reproductor from '../components/reproductor/Reproductor';;

const MisPeliculas = () => {
  const movies = useSelector((state) => state.alquiladas.value);
  console.log(movies)

  return (
    <>
      <div className='row sin-m'>
        <div className='col-12'>
          <h2 className='text-center py-5'>Mis Películas</h2>
        </div>
      </div>
      <div className='row sin-m'>
        <div className='col-12'>
          <Reproductor alquiladas={movies} />
        </div>
      </div>
      <div className='container pt-5'>
        <div className='row pt-4 d-flex justify-content-center'>
          { movies.map( (movie) => <CardMovie movie={movie} tipo="devolver"/> ) }
        </div>
      </div>
    </>
  )
}

export default MisPeliculas;  