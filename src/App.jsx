import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Card from "./components/Card";
import Liste from "./components/Liste";

import { useSelector, useDispatch } from "react-redux";
import { getData } from "./features/kanjiApi";

function App() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const kanji = useSelector((state) => state.api);

  if (!kanji.loading && !kanji.error && !kanji.data) {
    dispatch(getData());
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-base-200 gap-4">
        <Liste />
        <Card />
      </div>
    </>
  );
}

export default App;
