import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: "",
  score: 0,
  answers: [],
};

const players = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    setScore: (state, action) => {
      state.score++;
    },
    setAnswers: (state, action) => {
      state.answers.push(action.payload);
    },
  },
});

export const { setPlayer, setAnswers, setScore } = players.actions;

export default players.reducer;
