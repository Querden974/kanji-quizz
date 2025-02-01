import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Quizz from "./pages/Quizz";
import Settings from "./pages/Settings";

import { useSelector, useDispatch } from "react-redux";
import { getData } from "./features/kanjiApi";

function App() {
  const [currentKanji, setCurrentKanji] = useState("");

  console.log(currentKanji);

  const dispatch = useDispatch();
  const kanji = useSelector((state) => state.api);
  const choicesData = useSelector((state) => state.choices);

  // Get a random kanji
  function randomKanji() {
    if (kanji.data && kanji.data.length > 0) {
      const maxList = kanji.data.length;
      const randomIndex = Math.floor(Math.random() * maxList);
      return kanji.data[randomIndex];
    }
    return null;
  }
  // -----------------------------------------------------------------------------

  // Get 4 random kanji
  function generateChoices() {
    if (!kanji.data || kanji.data.length < 4) return [];

    const choices = new Set();
    choices.add(currentKanji);

    while (choices.size < 4) {
      const randKanji = randomKanji();
      if (randKanji) {
        choices.add(randKanji);
      }
    }
    const sortedChoices = [...choices].sort(() => Math.random() - 0.5);
    return Array.from(sortedChoices);
  }

  // -----------------------------------------------------------------------------

  // Déclencher quand le kanji change
  useEffect(() => {
    if (kanji.data?.length > 0) {
      const newKanji = randomKanji();
      setCurrentKanji(newKanji);
    }
  }, [kanji.data]); // Déclenché uniquement quand les données changent

  useEffect(() => {
    if (currentKanji) {
      dispatch(setKanji(currentKanji));
      dispatch(addChoices(generateChoices()));
      if (
        !choicesData.loading &&
        !choicesData.error &&
        choicesData.data.length === 0
      ) {
        dispatch(getDataKanji());
      }
    }
  }, [currentKanji]); // Déclenché uniquement quand `currentKanji` change

  useEffect(() => {
    if (choicesData.data.length > 0) {
      const kanjiInfo = choicesData.data.find(
        (kanji) => kanji.kanji === currentKanji
      );

      setKanjiInfo(kanjiInfo);
    }
  }, [choicesData.data]); // Déclenché uniquement quand `choicesData.data` change

  if (!kanji.loading && !kanji.error && !kanji.data) {
    dispatch(getData());
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-base-200 gap-4">
        {kanji.data ? <Quizz /> : <Settings />}
      </div>
      {/* <Quizz /> */}
    </>
  );
}

export default App;
