import React from "react";
import "./Buscar.css";

import { useSelector, useDispatch } from "react-redux";
import { fetchBySearch } from "../../redux/moviesSlice";
import { useState, useEffect } from "react";

const Buscar = () => {
  const movies = useSelector((state) => state.movies.value);
  const dispatch = useDispatch();

  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  useEffect(() => {
    dispatch(
      fetchBySearch({
        type: "discover",
        terminoBusqueda: terminoBusqueda,
      })
    );
  }, []);

  const buscar = (e) => {
    setTerminoBusqueda(e.target.value);
    dispatch(
      fetchBySearch({
        type: "search",
        terminoBusqueda: terminoBusqueda,
      })
    );
  };

  return (
    <input
      type="text"
      name=""
      placeholder="Buscar"
      id=""
      onChange={(e) => {
        buscar(e);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          buscar(e);
        }
      }}
    />
  );
};

export default Buscar;
