import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Countdown() {
  const [progress, setProgress] = useState(0);

  const settings = useSelector((state) => state.settings);
  const [duration, setDuration] = useState(settings.timer);

  useEffect(() => {
    const intervalTime = 1000;
    const increment = 1;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= duration) {
          clearInterval(interval); // Arrête l'animation quand elle est terminée
          setTimeout(() => {
            //dispatch(setReload()); // Déclenche une action pour recharger la page
            // window.location.reload(); // Recharge la page après l'animation
          }, 500);
          return duration;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval); // Nettoyage en cas de démontage
  }, []);

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
