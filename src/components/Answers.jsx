import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Answers({ isLine }) {
  const [answers, setAnswers] = useState([]);
  const player = useSelector((state) => state.players);
  useEffect(() => {
    setAnswers(player.answers);
  }, [player.answers]);

  return (
    <div
      className={`card  flex flex-wrap gap-1 ${isLine ? "flex-row " : "h-110"}`}
    >
      {/* {Array.apply(null, { length: 100 }).map((e, i) => (
        <h1 className="bg-red-300 rounded text-white font-semibold text-3xl w-10 h-10 text-center">
          -
        </h1>
      ))} */}
      {answers.map(
        (answer, index) =>
          index <= 55 && (
            <h1
              key={index}
              className={`bg-${
                answer.answer ? "success" : "error"
              } select-none rounded text-white font-semibold text-3xl h-10 w-10 inline-flex justify-center items-center`}
            >
              {answer.kanji}
            </h1>
          )
      )}
    </div>
  );
}
