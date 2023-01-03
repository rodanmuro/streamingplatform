import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {},
  },
  reducers: {
    setDataUser: (state, action) => {
      state.value = action.payload;
    }
  },
  extraReducers(builder) {},
});

export const { setDataUser } = userSlice.actions;

export default userSlice.reducer;
