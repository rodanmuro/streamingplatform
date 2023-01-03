import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiFirestore from '../api/apiFirebase/apiFirestore';
import sweetAlert from "../api/apiFirebase/sweetAlert";
import {agregarPeliculaCatalogo, borrarPeliculaCatalogo, obtenerPeliculasCatalogo} from '../api/apiSpring/apiSpring';

export const catalogoSlice = createSlice({
  name: "catalogo",
  initialState: {
    value: [],
  },
  reducers: {
    setCatalogo: (state, action) => {
      state.value = action.payload;
    }
  },
  extraReducers(builder){
    builder.addCase(
      addCatalogo.fulfilled,(state, action)=>{
        if(action.payload !== '')
          state.value = action.payload;
      }
    );
    builder.addCase(
      deleteOfCatalogo.fulfilled,(state, action)=>{
        if(action.payload !== '')
          state.value = action.payload;
      }
    );
  }
});

export const addCatalogo = createAsyncThunk("fetch/addCatalogo", async (movie) =>{
  let response = await agregarPeliculaCatalogo(movie);
  response !== 'duplicada' ? sweetAlert.showMovieAddCatalogo(movie, true) : sweetAlert.showMovieAddCatalogo(movie, false);

  return response ? await obtenerPeliculasCatalogo() : '';
});
export const deleteOfCatalogo = createAsyncThunk("fetch/deleteOfCatalogo", async (movie) =>{
  let response = await borrarPeliculaCatalogo(movie);
  response !== 'duplicada' ? sweetAlert.showMovieDeleteOfCatalogo(movie, true) : sweetAlert.showMovieDeleteOfCatalogo(movie, false);

  return response ? await obtenerPeliculasCatalogo() : '';
});

export const { setCatalogo } = catalogoSlice.actions;

export default catalogoSlice.reducer;
