import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiTmdb from "../api/apiTMDb/apiTmdb";

export const movieSlice = createSlice({
    name: "movie",
    initialState:{
        value: {}
    },
    reducers: {

    },
    extraReducers(builder){
        builder.addCase(fetchMovie.fulfilled,(state, action)=>{
            state.value = action.payload;
        })
    }
});

export const fetchMovie = createAsyncThunk("fetch/movie", async (id) => apiTmdb.getMovie(id) )

export default movieSlice.reducer;

