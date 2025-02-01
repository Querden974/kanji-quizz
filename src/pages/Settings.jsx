import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPseudo, setDifficulty } from "../features/settings";
import { useState } from "react";

export default function Settings() {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [level, setLevel] = useState(1);
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Quizz Settings</h2>
        <p>Set your name and choose the grade level of the quizz</p>
        {/* Username input: */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Set your username"
            value={useSelector((state) => state.settings.pseudo)}
            onChange={(e) => dispatch(setPseudo(e.target.value))}
          />
        </div>
        {/* ------------------------------- */}
        {/* Grade level range: */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Grade level: {useSelector((state) => state.settings.difficulty)}
            </span>
          </label>
          <input
            type="range"
            min="1"
            max="7"
            value={useSelector((state) =>
              Math.ceil(Math.round(state.settings.difficulty))
            )}
            onChange={(e) => dispatch(setDifficulty(Number(e.target.value)))}
            className="range"
            step={1}
          />
          <div className="flex w-full justify-between px-2 text-xs">
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
          </div>
        </div>
        {/* ------------------------------- */}
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => console.log(settings)}
          >
            Start Quizz
          </button>
        </div>
      </div>
    </div>
  );
}
