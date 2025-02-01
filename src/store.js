import { configureStore } from "@reduxjs/toolkit";
import kanjiAPI from "./features/kanjiApi";
import choices from "./features/choices";
import settings from "./features/settings";

export const store = configureStore({
  reducer: {
    api: kanjiAPI, //Ajouter les reducers ici
    choices: choices,
    settings: settings,
  },
});

export default store;
