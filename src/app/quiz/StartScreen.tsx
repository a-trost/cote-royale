"use client";

import { RevealText } from "@/components/RevealText";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type StartScreenProps = {
  quizData: Content.QuizDocument;
  onStart: () => void;
};

export const StartScreen = ({ quizData, onStart }: StartScreenProps) => {
  const { eyebrow, title, body, start_button_text } = quizData.data;

  return (
    <div className="mx-auto max-w-4xl py-40 text-center">
      <p className="mb-4 tracking-widest uppercase">{eyebrow}</p>
      <RevealText
        field={title}
        id="quiz-title"
        align="center"
        className="font-display mb-8 text-5xl text-balance sm:text-6xl md:text-7xl"
      />

      <div className="mx-auto mb-12 max-w-2xl text-lg text-balance text-gray-300">
        <PrismicRichText field={body} />
      </div>

      <button
        onClick={onStart}
        className="inline-block cursor-pointer bg-white px-12 py-4 font-extrabold tracking-wider text-black uppercase transition-colors hover:bg-gray-100"
      >
        {start_button_text || "Start the quiz"}
      </button>
    </div>
  );
};
