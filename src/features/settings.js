import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pseudo: "",
  difficulty: 1,
  timer: 15,
  pack: 10,
  reload: 0,
  alert: false,
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
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setPack: (state, action) => {
      state.pack = action.payload;
    },
    setAlert: (state, action) => {
      state.pack = action.payload;
    },
  },
});

export const {
  setPseudo,
  setDifficulty,
  setReload,
  setTimer,
  setPack,
  setAlert,
} = settings.actions;

export default settings.reducer;
