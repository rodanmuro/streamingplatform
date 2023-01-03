import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMisPeliculas } from "../../redux/alquiladasSlice";
import { addCatalogo } from "../../redux/catalogoSlice";


const Alquilar = ({ movie }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  return (
    <button 
      className="btn-success position-absolute end-0 top-0 m-4"
      onClick={() => dispatch( 
        user.role === 'ADMIN' ? addCatalogo(movie) : addMisPeliculas(movie) 
      )}
    >
      { user.role === 'ADMIN' ? 'Agregar al Catálogo' : 'Alquilar' }
    </button>
  );
};

export default Alquilar;
