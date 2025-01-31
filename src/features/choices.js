import { createSlice } from "@reduxjs/toolkit";

const apiUrl = "https://kanjiapi.dev/v1/kanji/";
const initialState = {
  loading: false,
  kanji: "",
  choices: [],
  data: [],
  error: false,
};

const choicesSlice = createSlice({
  name: "choices",
  initialState,
  reducers: {
    setKanji: (state, action) => {
      state.kanji = action.payload;
    },
    addChoices: (state, action) => {
      state.choices = action.payload;
      //console.log("Choices updated:", action.payload);
    },
    addData: (state, action) => {
      state.data = [];
      state.data = [...state.data, ...action.payload]; // Ajoute plusieurs kanjis sans écraser
    },
    addError: (state) => {
      state.error = true;
      state.loading = false;
    },
    addLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export function getDataKanji() {
  return async (dispatch, getState) => {
    dispatch(addLoading(true));

    const state = getState();
    const choices = state.choices.choices; // Vérifie bien que le state est bien structuré ainsi

    if (!Array.isArray(choices) || choices.length === 0) {
      dispatch(addLoading(false));
      return;
    }

    try {
      const responses = await Promise.all(
        choices.map(async (choice) => {
          const response = await fetch(apiUrl + choice);
          if (!response.ok) throw new Error("HTTP error");
          return response.json();
        })
      );

      dispatch(addData(responses)); // Envoie toutes les données d'un coup
    } catch (error) {
      dispatch(addError());
    } finally {
      dispatch(addLoading(false));
    }
  };
}

export const { setKanji, addChoices, addData, addError, addLoading } =
  choicesSlice.actions;

export default choicesSlice.reducer;
