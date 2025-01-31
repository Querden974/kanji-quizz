import React from "react";

export default function Card() {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <h1 className="text-9xl font-bold pb-6">子</h1>
      </figure>
      <div className="card-body items-center text-center">
        <p>Que signifie ce kanji ?</p>
        <div className="card-actions grid grid-cols-2 gap-4 w-full">
          <button className="btn btn-primary">Enfant</button>
          <button className="btn btn-primary">Chat</button>
          <button className="btn btn-primary">Montagne</button>
          <button className="btn btn-primary">Rivière</button>
        </div>
      </div>
    </div>
  );
}
