import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './moviesSlice';
import movieReducer from './movieSlice';
import alquiladasReducer from './alquiladasSlice';
import userReducer from './userSlice';
import catalogoReducer from "./catalogoSlice";

export default configureStore(
  {
    reducer: {
        movies: moviesReducer,
        movie: movieReducer,
        alquiladas: alquiladasReducer,
        user: userReducer,
        catalogo:catalogoReducer
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
