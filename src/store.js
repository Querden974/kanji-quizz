import { configureStore } from "@reduxjs/toolkit";
import kanjiAPI from "./features/kanjiApi"; //Importer le reducer ici

export const store = configureStore({
  reducer: {
    api: kanjiAPI, //Ajouter les reducers ici
  },
});

export default store;
