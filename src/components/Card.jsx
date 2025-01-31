import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Card() {
  const [currentkanji, setCurrentkanji] = useState("");
  const dispatch = useDispatch();
  const kanji = useSelector((state) => state.api);

  function randomKanji() {
    if (kanji.data) {
      const maxList = kanji.data.length;
      const randomIndex = Math.floor(Math.random() * maxList);
      setCurrentkanji(kanji.data[randomIndex]);
    }
  }

  const choices = [currentkanji];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    if (kanji.data) {
      if (!choices.includes(kanji.data[randomIndex])) {
        choices.push(kanji.data[randomIndex]);
      }
    }
  }

  console.log(choices);

  useEffect(() => {
    randomKanji();
  }, [kanji.data]);
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <h1 className="text-9xl font-bold pb-6">{currentkanji}</h1>
      </figure>
      <div className="card-body items-center text-center">
        <p>Que signifie ce kanji ?</p>
        <div className="card-actions grid grid-cols-2 gap-4 w-full">
          <button
            className="btn btn-primary"
            onClick={() => dispatch(getAPI())}
          >
            Enfant
          </button>
          <button className="btn btn-primary">Chat</button>
          <button className="btn btn-primary">Montagne</button>
          <button className="btn btn-primary">Rivière</button>
        </div>
      </div>
    </div>
  );
}
