import React from "react";
import Answers from "./Answers";

export default function Results() {
  return (
    <div className="card sm:bg-base-100 min-w-96 sm:shadow-xl p-3 ">
      <div className="flex items-baseline align-baseline justify-between mb-3">
        <h1 className="font-semibold ">Résultats du quizz !</h1>
        <button
          className="btn btn-primary select-none"
          onClick={() => window.location.reload()}
        >
          Retour au menu
        </button>
      </div>

      <Answers isLine={true} />
    </div>
  );
}
