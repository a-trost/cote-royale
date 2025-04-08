"use client";

import { Content } from "@prismicio/client";
import { useState } from "react";
import { StartScreen } from "./StartScreen";

type QuizProps = {
  quizData: Content.QuizDocument;
  fragrances: Content.FragranceDocument[];
};

type QuizStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export const Quiz = ({ quizData, fragrances }: QuizProps) => {
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("NOT_STARTED");

  const start = () => {
    setQuizStatus("IN_PROGRESS");
  };

  return (
    <div className="min-h-screen">
      {/* START SCREEN */}
      {quizStatus === "NOT_STARTED" && (
        <div>
          <StartScreen onStart={start} quizData={quizData} />
        </div>
      )}

      {/* QUESTIONS */}
      {quizStatus === "IN_PROGRESS" && <div>Questions</div>}

      {/* RESULTS */}
      {quizStatus === "COMPLETED" && <div>Results</div>}
    </div>
  );
};
