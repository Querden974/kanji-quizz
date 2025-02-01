import React from "react";
import Card from "../components/Card";
import Liste from "../components/Liste";

export default function Quizz() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-base-200 gap-4">
      <Liste />
      <Card />
    </div>
  );
}
