import React from "react";
import Alert from "./Alert";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setKanji, addChoices } from "../features/choices";
import { getDataKanji } from "../features/choices";

export default function Card() {
  const [currentKanji, setCurrentKanji] = useState("");
  const [kanjiInfo, setKanjiInfo] = useState(undefined);
  const [select, setSelect] = useState(undefined);
  const [alertInfo, setAlertInfo] = useState({});
  const [progress, setProgress] = useState(100);

  const dispatch = useDispatch();
  const choicesData = useSelector((state) => state.choices);

  const kanji = useSelector((state) => state.api);

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
  const choices = generateChoices();

  // -----------------------------------------------------------------------------
  function pickChoice(choice) {
    setSelect(true); // Change l’état, mais ça n'affecte pas cette exécution

    const isCorrect = choice.kanji === currentKanji;

    setAlertInfo({
      message: isCorrect
        ? "Bravo ! Tu as répondu correctement !"
        : "Mauvaise réponse !",
      type: isCorrect ? "alert-success" : "alert-error",
    });

    // calculer progress bar pour reloader la page
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);

    console.log(alertInfo);
  }
  // Déclencher quand le kanji change
  useEffect(() => {
    if (kanji.data && kanji.data.length > 0) {
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
      console.log(kanjiInfo);
    }
  }, [choicesData.data]); // Déclenché uniquement quand `choicesData.data` change

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10 flex flex-col gap-4">
          <h1 className="text-9xl font-bold pb-6">{currentKanji}</h1>
        </figure>
        <div className="card-body items-center text-center">
          <p>Que signifie ce kanji ?</p>
          <div className="card-actions grid grid-cols-2 gap-4 w-full">
            {choicesData &&
              choicesData.data.map((choice, index) => (
                <button
                  key={index}
                  className={`btn capitalize ${
                    !select
                      ? "btn-primary"
                      : choice.kanji === currentKanji
                      ? "btn-success"
                      : "btn-error"
                  }`}
                  onClick={() => pickChoice(choice)}
                >
                  {choice.heisig_en}
                </button>
              ))}
          </div>
        </div>
      </div>
      {select && <Alert message={alertInfo.message} type={alertInfo.type} />}
    </>
  );
}
