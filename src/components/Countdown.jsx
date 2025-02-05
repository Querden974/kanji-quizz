import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Countdown({ status, select }) {
  const [progress, setProgress] = useState(0);

  const settings = useSelector((state) => state.settings);
  const [duration, setDuration] = useState(settings.timer);

  const intervalTime = 1000;
  var increment = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      if (select) {
        clearInterval(interval);
        increment = 0;
      }
      setProgress((prev) => {
        if (prev + increment >= duration) {
          clearInterval(interval); // Arrête l'animation quand elle est terminée
          setTimeout(() => {
            status(true);
          }, 500);
          return duration;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval); // Nettoyage en cas de démontage
  }, [select]);

  return (
    <>
      <div
        className="radial-progress"
        style={{ "--value": Math.floor((progress * 100) / duration) }}
      >
        <span className="countdown">
          <span style={{ "--value": progress }}></span>
        </span>
      </div>
    </>
  );
}
