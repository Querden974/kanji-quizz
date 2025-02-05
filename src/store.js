import { configureStore } from "@reduxjs/toolkit";
import kanjiAPI from "./features/kanjiApi";
import choices from "./features/choices";
import settings from "./features/settings";
import players from "./features/players";

export const store = configureStore({
  reducer: {
    api: kanjiAPI, //Ajouter les reducers ici
    choices: choices,
    settings: settings,
    players: players,
  },
});

export default store;
