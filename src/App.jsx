import { useState, useEffect } from "react";
import Quizz from "./pages/Quizz";
import Settings from "./pages/Settings";

import { useSelector, useDispatch } from "react-redux";
import { getData } from "./features/kanjiApi";

function App() {
  const dispatch = useDispatch();
  const kanji = useSelector((state) => state.api);
  if (!kanji.loading && !kanji.error && !kanji.data) {
    dispatch(getData());
  }

  return (
    <>
      <div className="overflow-clip flex flex-col items-center justify-center min-h-screen min-w-screen py-2 sm:bg-base-200 gap-4">
        {kanji.data ? <Quizz /> : <Settings />}
      </div>
    </>
  );
}

export default App;
