import React from "react";
import Card from "../components/Card";
import Liste from "../components/Liste";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setKanji, addChoices } from "../features/choices";
import { getDataKanji } from "../features/choices";

export default function Quizz() {
  const [currentKanji, setCurrentKanji] = useState("");

  const reload = useSelector((state) => state.settings.reload);
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const kanji = useSelector((state) => state.api);
  const reloadState = useSelector((state) => state.settings.reload);
  const players = useSelector((state) => state.players);

  // // -----------------------------------------------------------------------------

  // Get a random kanji
  function randomKanji() {
    if (kanji.data && kanji.data.length > 0) {
      let newKanji;
      do {
        const randomIndex = Math.floor(Math.random() * kanji.data.length);
        newKanji = kanji.data[randomIndex];
      } while (newKanji === currentKanji); // Évite d’avoir le même Kanji consécutivement
      return newKanji;
    }
    return null;
  }
  // -----------------------------------------------------------------------------

  // Get 4 random kanji
  function generateChoices(newKanji) {
    // console.log(newKanji);
    if (!kanji.data || kanji.data.length < 4) return [];

    const choices = new Set();
    choices.add(newKanji); // Ajouter le Kanji actuel

    while (choices.size < 4) {
      const randKanji = randomKanji();
      if (randKanji) choices.add(randKanji);
    }
    // console.log([...choices]);
    return [...choices].sort(() => Math.random() - 0.5); // Mélanger les choix
  }

  // -----------------------------------------------------------------------------

  // Déclencher quand le kanji change
  useEffect(() => {
    if (kanji.data?.length > 0) {
      const newKanji = randomKanji();
      setCurrentKanji(newKanji);
    }
  }, [kanji.data, reloadState]); // Déclenché uniquement quand les données changent

  useEffect(() => {
    if (currentKanji) {
      const choices = generateChoices(currentKanji);
      dispatch(setKanji(currentKanji));
      dispatch(addChoices(choices));
      dispatch(getDataKanji());
    }
  }, [currentKanji]); // Se déclenche uniquement quand currentKanji change

  return (
    <>
      {/* <Liste /> */}

      <Card key={reload} currentKanji={currentKanji} player={players} />
    </>
  );
}
