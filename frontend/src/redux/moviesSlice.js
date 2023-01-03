import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { obtenerPeliculasCatalogo } from "../api/apiSpring/apiSpring";
import apiTmdb from "../api/apiTMDb/apiTmdb";

export const moviesSlice = createSlice({
    name: "movies",
    initialState:{
        value:[]
    },
    reducers: {

    },
    extraReducers(builder){
        builder.addCase(fetchBySearch.fulfilled,(state, action)=>{
            state.value = action.payload;
        })
    }
});

export const fetchBySearch = createAsyncThunk("fetch/movies", async (propiedades) =>{
    let peliculasCatalogo = await obtenerPeliculasCatalogo(); 
    let peliculasTmdb = await apiTmdb.getListMovies(propiedades);

    for(let i = 0; i < peliculasCatalogo.length; i++){
       for(let j = 0; j < peliculasTmdb.length; j++){
        if(peliculasCatalogo[i]['idPelicula'] === peliculasTmdb[j]['id']){
            peliculasTmdb.splice(j, 1);
            break;
        }  
       }
    }

    //console.log(peliculasTmdb);

    return peliculasTmdb; 
    
});

export default moviesSlice.reducer;

