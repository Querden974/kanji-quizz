import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pseudo: "",
  difficulty: 1,
  reload: 0,
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
    setReload: (state, action) => {
      state.reload++;
    },
  },
});

export const { setPseudo, setDifficulty, setReload } = settings.actions;

export default settings.reducer;
