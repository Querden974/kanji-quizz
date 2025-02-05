import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setReload } from "../features/settings";
import { resetState } from "../features/kanjiApi";

export default function Alert({ message, type, icon }) {
  const [progress, setProgress] = useState(0); // Progression en %
  const dispatch = useDispatch();

  useEffect(() => {
    const duration = 3000; // Durée totale en millisecondes (3 secondes)
    const intervalTime = 10; // Intervalle de mise à jour (50ms)
    const steps = duration / intervalTime; // Nombre total d'étapes
    const increment = 100 / steps; // Incrémentation par étape

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(interval); // Arrête l'animation quand elle est terminée
          setTimeout(() => {
            dispatch(setReload()); // Déclenche une action pour recharger la page
            // window.location.reload(); // Recharge la page après l'animation
          }, 500);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval); // Nettoyage en cas de démontage
  }, []);

  return (
    <div
      role="alert"
      className={`flex flex-col relative alert select-none  w-96 ${type}`}
    >
      <div className="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={icon}
          />
        </svg>
        <span className="font-bold text-md">{message}</span>
      </div>

      <progress
        className="progress progress-neutral w-full"
        value={100 - progress}
        max="100"
      ></progress>
    </div>
  );
}
