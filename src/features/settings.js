import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pseudo: "",
  difficulty: 1,
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPseudo: (state, action) => {
      state.pseudo = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
  },
});

export const { setPseudo, setDifficulty } = settings.actions;

export default settings.reducer;
