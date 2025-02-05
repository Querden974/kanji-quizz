import React from "react";
import Alert from "./Alert";
import Countdown from "./Countdown";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getDataKanji } from "../features/choices";

export default function Card({ currentKanji, choicesData }) {
  const [select, setSelect] = useState(false); // Sélection de la réponse
  const [end, setEnd] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    message: "",
    type: "",
    icon: "",
  });
  const dispatch = useDispatch();
  const choices = useSelector((state) => state.choices.data);

  function pickChoice(choice) {
    setSelect(true); // Change l’état, mais ça n'affecte pas cette exécution

    const isCorrect = choice.kanji === currentKanji;

    setAlertInfo({
      message: isCorrect
        ? "Bravo ! Tu as répondu correctement !"
        : "Mauvaise réponse !",
      type: isCorrect ? "alert-success" : "alert-error",
      icon: isCorrect
        ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    });
  }

  function handleEnd() {
    setSelect(true);
    setAlertInfo({
      message: "Temps écoulé ! Tu as perdu !",
      type: "alert-error",
      icon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    });
  }

  useEffect(() => {
    dispatch(getDataKanji());
  }, [currentKanji]); // Déclenché uniquement quand `currentKanji` change

  useEffect(() => {
    if (end) {
      handleEnd();
    }
  }, [end]);

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <Countdown status={setEnd} select={select} />
        {/* <button
          className="btn btn-warning ml-auto mt-auto"
          onClick={() => dispatch(setReload())}
        >
          Reload
        </button> */}
        <figure className="px-10 pt-10 flex flex-col gap-4">
          <h1 className="text-9xl font-bold pb-6 select-none">
            {currentKanji}
          </h1>
        </figure>
        <div className="card-body items-center text-center">
          <p>Que signifie ce kanji ?</p>
          <div className="card-actions grid grid-cols-2 gap-4 w-full">
            {choices?.length > 0 ? (
              choices.map((choice, index) => (
                <button
                  key={`${choice.kanji}-${index}`}
                  className={`select-none py-2 px-4 cursor-pointer rounded capitalize font-bold ${
                    !select
                      ? "bg-primary hover:bg-primary/75"
                      : choice.kanji === currentKanji
                      ? "bg-success border-4 border-success"
                      : "bg-error border-4 border-error"
                  } }`}
                  onClick={() => pickChoice(choice)}
                  disabled={select}
                >
                  {choice.heisig_en}
                </button>
              ))
            ) : (
              <span className="loading loading-spinner loading-lg"></span>
            )}
          </div>
        </div>
      </div>
      {select && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          icon={alertInfo.icon}
        />
      )}
    </>
  );
}
