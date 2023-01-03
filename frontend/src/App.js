import React, { useState, useEffect } from "react";
import sweetAlert from "./api/apiFirebase/sweetAlert";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataUser } from "./redux/userSlice";
import { setMisPeliculas } from "./redux/alquiladasSlice";
import Router from "./router/Router";

import { firebaseApp } from "./api/apiFirebase/apiConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import apiFirestore from "./api/apiFirebase/apiFirestore";

import {
  isLogged,
  getDataUser,
  obtenerPeliculasCatalogo,
  obtenerPeliculasAlquiladas,
} from "./api/apiSpring/apiSpring";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login";
import { setCatalogo } from "./redux/catalogoSlice";

const auth = getAuth(firebaseApp);

const App3 = () => {
  const dataUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const iniciar = async () => {
    let logueado = await isLogged();

    if (logueado) {
      let usuario = await getDataUser();
      dispatch(setDataUser(usuario));
    }

    return logueado;
  };

  const obtenerPeliculas = async (dataUser) => {
    dataUser = await getDataUser();
    
    let peliculasCatalogo = [];
    peliculasCatalogo = await obtenerPeliculasCatalogo();
    dispatch(setCatalogo(peliculasCatalogo));

    if (dataUser) {
      let misPeliculas = [];
      if (dataUser.role == "USER") {
        misPeliculas = await obtenerPeliculasAlquiladas();
        dispatch(setMisPeliculas(misPeliculas));
      }
    }
    sweetAlert.showSignIn(dataUser);
  };

  if (dataUser.email) {
    obtenerPeliculas(dataUser);
  }

  useEffect(() => {
    iniciar();
  }, []);

  return (
    <>
      {dataUser.email ? (
        <BrowserRouter>
          <Navbar />
          <Router />
          <Footer />
        </BrowserRouter>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App3;
