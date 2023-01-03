import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Login';
import Catalogo from '../pages/Catalogo';
import MisPeliculas from './../pages/MisPeliculas';
import MoviesTMDB from "./../pages/MoviesTMDB";

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Catalogo />} />
      <Route path='/plataformasstreaming' element={<Catalogo />} />
      <Route path='/catalogo' element={<Catalogo />} />
      <Route path='/mispeliculas' element={<MisPeliculas />} />
      <Route path='/moviestmdb' element={<MoviesTMDB />} />
    </Routes>
  )
}

export default Router;