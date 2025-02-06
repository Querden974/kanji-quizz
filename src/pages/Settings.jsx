import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPseudo,
  setDifficulty,
  setTimer,
  setPack,
} from "../features/settings";
import { setUrlApi } from "../features/kanjiApi";
import { useState } from "react";
import { getData } from "../features/kanjiApi";
import { setPlayer } from "../features/players";

export default function Settings() {
  const settings = useSelector((state) => state.settings);
  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();

  const kanji = useSelector((state) => state.api);

  function handleBtn(e) {
    e.preventDefault();

    if (settings.difficulty && settings.pseudo.length > 0) {
      let difficulty = settings.difficulty;
      if (difficulty == 7) difficulty = 8;
      dispatch(setPlayer(settings.pseudo));
      dispatch(setUrlApi(difficulty));

      if (!kanji.loading && !kanji.error && !kanji.data) {
        dispatch(getData());
      }
    }
  }
  return (
    <div className="card bg-base-100 sm:w-96 sm:shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Quizz Settings</h2>
        <p>Set your name and choose the grade level.</p>
        {/* Username input: */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered focus:overflow-clip"
            placeholder="Set your username"
            value={useSelector((state) => state.settings.pseudo)}
            onChange={(e) => {
              dispatch(setPseudo(e.target.value));
            }}
            onFocus={window.scrollTo(0, 0)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleBtn(e);
              }
            }}
          />
        </div>
        {/* ------------------------------- */}
        {/* Grade level range: */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Grade level: <b>{settings.difficulty}</b>
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
          <div className="flex w-full justify-between px-2 text-xs select-none">
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
        {/* Set Timer duration  */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Duration Timer: <b>{settings.timer} s</b>
            </span>
          </label>
          <input
            type="range"
            min="5"
            max="30"
            value={settings.timer}
            onChange={(e) => dispatch(setTimer(Number(e.target.value)))}
            className="range"
            step={1}
          />
        </div>
        {/* ------------------------------- */}
        {/* Set pack size  */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Pack size: <b>{settings.pack}</b>
            </span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={settings.pack}
            onChange={(e) => dispatch(setPack(Number(e.target.value)))}
            className="range"
            step={10}
          />
        </div>
        <div className="card-actions justify-end">
          <button
            className={`btn btn-primary ${
              !settings.pseudo ? "btn-disabled" : ""
            }`}
            onClick={(e) => handleBtn(e)}
          >
            Start Quizz
          </button>
        </div>
      </div>
    </div>
  );
}
