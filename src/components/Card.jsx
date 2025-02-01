import React from "react";
import Alert from "./Alert";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getDataKanji } from "../features/choices";

export default function Card({ currentKanji, choicesData }) {
  const [select, setSelect] = useState(false); // Sélection de la réponse

  const [alertInfo, setAlertInfo] = useState({
    message: "",
    type: "",
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
    });
  }
  useEffect(() => {
    dispatch(getDataKanji());
  }, [currentKanji]); // Déclenché uniquement quand `currentKanji` change

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
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
      {select && <Alert message={alertInfo.message} type={alertInfo.type} />}
    </>
  );
}
