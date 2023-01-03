import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAlquilada, getAlquiladas, eliminarAlquilada } from "../api/apiTMDb/apiConfig";
import apiFirestore from '../api/apiFirebase/apiFirestore';

// Importación de la API de SpringBoot
import { agregarPeliculaAlquilada, agregarPeliculaCatalogo, borrarPeliculaAlquilada, login, obtenerPeliculasAlquiladas, obtenerPeliculasCatalogo } from '../api/apiSpring/apiSpring';
import sweetAlert from "../api/apiFirebase/sweetAlert";

export const alquiladasSlice = createSlice({
  name: "alquiladas",
  initialState: {
    value: [],
  },
  reducers: {
    setMisPeliculas: (state, action) => {
      state.value = action.payload;
    }
  },
  extraReducers(builder){
    // Métodos de consulta para clientes
    builder.addCase(
      addMisPeliculas.fulfilled,(state, action)=>{
        if(action.payload !== '')
          state.value = action.payload;
      }
    );
    builder.addCase(
      deleteOfMisPeliculas.fulfilled,(state, action)=>{
        if(action.payload !== '')
          state.value = action.payload;
      }
    );
  }
});

export const addMisPeliculas = createAsyncThunk("fetch/addMisPeliculas", async (movie) => {
  let response = await agregarPeliculaAlquilada(movie.id);
  response !== 'duplicada' ? sweetAlert.showMovieAlquilada(movie, true) : sweetAlert.showMovieAlquilada(movie, false);

  return response ? await obtenerPeliculasAlquiladas() : '';
});
export const deleteOfMisPeliculas = createAsyncThunk("fetch/deleteOfMisPeliculas", async (movie) => {
  let response = await borrarPeliculaAlquilada(movie.id);
  response && response.estado === 'borrada' ? sweetAlert.showDeleteMovieAlquilada(movie, true) : sweetAlert.showDeleteMovieAlquilada(movie, false);

  return response ? await obtenerPeliculasAlquiladas() : '';
});

export const { setMisPeliculas } = alquiladasSlice.actions;

export default alquiladasSlice.reducer;
