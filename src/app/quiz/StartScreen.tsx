"use client";

import { FadeIn } from "@/components/FadeIn";
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
      <FadeIn className="translate-y-8" vars={{ delay: 0, duration: 1.2 }}>
        <p className="mb-4 tracking-widest uppercase">{eyebrow}</p>
      </FadeIn>
      <RevealText
        field={title}
        id="quiz-title"
        align="center"
        className="font-display mb-8 text-5xl text-balance sm:text-6xl md:text-7xl"
        duration={2}
      />

      <FadeIn
        className="mx-auto mb-12 max-w-2xl translate-y-8 text-lg text-balance text-gray-300"
        vars={{ delay: 1.3, duration: 2 }}
      >
        <PrismicRichText field={body} />
      </FadeIn>

      <FadeIn className="translate-y-8" vars={{ delay: 2, duration: 2 }}>
        <button
          onClick={onStart}
          className="inline-block cursor-pointer bg-white px-12 py-4 font-extrabold tracking-wider text-black uppercase transition-colors hover:bg-gray-100"
        >
          {start_button_text || "Start the quiz"}
        </button>
      </FadeIn>
    </div>
  );
};
