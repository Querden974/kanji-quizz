import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Answers() {
  const [answers, setAnswers] = useState([]);
  const player = useSelector((state) => state.players);
  useEffect(() => {
    setAnswers(player.answers);
  }, [player.answers]);

  return (
    <div className="w-min card h-110  flex flex-wrap gap-2">
      {/* {Array.apply(null, { length: 56 }).map((e, i) => (
        <h1 className="bg-red-300 rounded text-white font-semibold text-3xl h-12 w-12 text-center">
          g
        </h1>
      ))} */}
      {answers.map(
        (answer, index) =>
          index <= 55 && (
            <h1
              key={index}
              className={`bg-${
                answer.answer ? "success" : "error"
              } rounded text-white font-semibold text-3xl h-12 w-12 inline-flex justify-center items-center`}
            >
              {answer.kanji}
            </h1>
          )
      )}
    </div>
  );
}
