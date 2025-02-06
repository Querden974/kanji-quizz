import React from "react";
import Card from "../components/Card";
import Results from "../components/Results";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setKanji, addChoices } from "../features/choices";
import { getDataKanji } from "../features/choices";

export default function Quizz() {
  const [currentKanji, setCurrentKanji] = useState("");
  const [end, setEnd] = useState(false);
  const [answer, setAnswer] = useState(0);

  const reload = useSelector((state) => state.settings.reload);
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const kanji = useSelector((state) => state.api);
  const reloadState = useSelector((state) => state.settings.reload);
  const players = useSelector((state) => state.players);
  const [pack, setPack] = useState(settings.pack);

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
    setAnswer(answer + 1);
    if (answer === pack) {
      if (!settings.alert) {
        setEnd(true);
      }
    } else if (kanji.data?.length > 0) {
      const newKanji = randomKanji();
      setCurrentKanji(newKanji);
    }
  }, [reloadState]); // Déclenché uniquement quand les données changent

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
      {!end ? (
        <Card key={reload} currentKanji={currentKanji} player={players} />
      ) : (
        <Results />
      )}

      {/* {end && <h1>Quizz is over!</h1>} */}
    </>
  );
}
