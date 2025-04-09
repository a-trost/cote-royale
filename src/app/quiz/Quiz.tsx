"use client";

import { Content } from "@prismicio/client";
import { useRef, useState } from "react";
import { StartScreen } from "./StartScreen";
import { gsap } from "gsap";
import { Question } from "./Question";
import { FragranceType, Votes } from "./types";
import { Results } from "./Results";

type QuizProps = {
  quizData: Content.QuizDocument;
  fragrances: Content.FragranceDocument[];
};

type QuizStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export const Quiz = ({ quizData, fragrances }: QuizProps) => {
  const startScreenRef = useRef<HTMLDivElement>(null);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("COMPLETED");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [votes, setVotes] = useState<Votes>({
    Terra: 0,
    Ignis: 0,
    Aqua: 0,
  });
  const questions = quizData.data.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const start = () => {
    if (!startScreenRef.current) return;

    gsap.to(startScreenRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setQuizStatus("IN_PROGRESS");
      },
    });
  };

  const addVote = (fragranceType: FragranceType) => {
    setVotes((prev) => ({
      ...prev,
      [fragranceType]: prev[fragranceType] + 1,
    }));

    if (currentQuestionIndex >= questions.length - 1) {
      setQuizStatus("COMPLETED");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const back = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setQuizStatus("NOT_STARTED");
    }
  };

  const reset = () => {
    setVotes({
      Terra: 0,
      Ignis: 0,
      Aqua: 0,
    });
    setCurrentQuestionIndex(0);
    setQuizStatus("NOT_STARTED");
  };

  return (
    <div className="min-h-screen">
      {/* START SCREEN */}
      {quizStatus === "NOT_STARTED" && (
        <div ref={startScreenRef}>
          <StartScreen onStart={start} quizData={quizData} />
        </div>
      )}

      {/* QUESTIONS */}
      {quizStatus === "IN_PROGRESS" && (
        <div>
          <Question
            onAnswerSelected={addVote}
            onBack={back}
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </div>
      )}

      {/* RESULTS */}
      {quizStatus === "COMPLETED" && (
        <Results votes={votes} fragrances={fragrances} onRetakeQuiz={reset} />
      )}
    </div>
  );
};
