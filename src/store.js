import { configureStore } from "@reduxjs/toolkit";
import kanjiAPI from "./features/kanjiApi";
import choices from "./features/choices";

export const store = configureStore({
  reducer: {
    api: kanjiAPI, //Ajouter les reducers ici
    choices: choices,
  },
});

export default store;
