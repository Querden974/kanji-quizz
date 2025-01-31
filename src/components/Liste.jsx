import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Liste() {
  const kanji = useSelector((state) => state.api);
  //console.log(kanji);

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <h2>Liste des kanji du grade 1</h2>
      <ul className="flex gap-2 flex-wrap">
        {kanji.data &&
          kanji.data.map((kanji, index) => <li key={index}>{kanji}</li>)}
      </ul>
    </div>
  );
}
