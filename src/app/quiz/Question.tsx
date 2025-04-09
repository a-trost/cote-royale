"use client";

import { Content, ImageField } from "@prismicio/client";
import { AnswerOption, FragranceType } from "./types";
import { Fragment, useRef, useState } from "react";
import clsx from "clsx";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type QuestionProps = {
  question: Content.QuizDocumentDataQuestionsItem;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSelected: (fragranceType: FragranceType) => void;
  onBack: () => void;
};

export const Question = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSelected,
  onBack,
}: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<FragranceType | null>(
    null,
  );
  const [answers, setAnswers] = useState<AnswerOption[]>([]);

  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    setSelectedOption(null);

    gsap.set(".answer-option", {
      clearProps: "all",
      opacity: 1,
      scale: 1,
    });

    const answerOptions: AnswerOption[] = [
      { text: question.answer_terra || "", value: "Terra" },
      { text: question.answer_ignis || "", value: "Ignis" },
      { text: question.answer_aqua || "", value: "Aqua" },
    ];

    setAnswers(gsap.utils.shuffle(answerOptions));

    gsap.to(".question-content", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      onComplete: handleAnimationComplete,
    });
  }, [question]);

  const handleAnimationComplete = () => {
    if (questionHeadingRef.current) {
      questionHeadingRef.current.focus();
    }
  };

  const getImageField = (fragranceType: FragranceType) => {
    switch (fragranceType) {
      case "Terra":
        return question.image_terra;
      case "Ignis":
        return question.image_ignis;
      case "Aqua":
        return question.image_aqua;
    }
  };

  const handleSelectAnswer = (answer: FragranceType) => {
    gsap.set(".answer-option", {
      clearProps: "all",
      opacity: 1,
      scale: 1,
    });

    const tl = gsap.timeline({
      onStart: () => setSelectedOption(answer),
    });

    tl.to(".answer-option", {
      opacity: 0.5,
      scale: 1,
      duration: 0.2,
      ease: "power1.out",
    });
    tl.to(
      `.answer-${answer}`,
      {
        opacity: 1,
        scale: 1.05,
        duration: 0.25,
        ease: "back.out(1.2)",
      },
      "<", // start with previous TL tween
    );
  };

  const handleNext = () => {
    if (selectedOption) {
      gsap.to(".question-content", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => onAnswerSelected(selectedOption),
      });
    }
  };

  const handleBack = () => {
    gsap.to(".question-content", {
      opacity: 0,
      y: 10,
      duration: 0.5,
      ease: "power2.in",
      onComplete: onBack,
    });
  };

  return (
    <div className="mx-auto max-w-4xl py-10 text-center">
      {/* Step Counter */}
      <div className="mx-auto mb-10 flex w-full max-w-md items-center">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <Fragment key={index}>
            <div
              className={clsx(
                "relative flex size-14 items-center justify-center rounded-full border border-gray-600 text-xl font-semibold transition-all duration-1000",
                index + 1 < questionNumber &&
                  "scale-100 bg-neutral-800 text-neutral-50",
                index + 1 === questionNumber &&
                  "scale-110 bg-neutral-50 text-neutral-950",
                index + 1 > questionNumber &&
                  "scale-100 bg-neutral-900 text-neutral-50",
              )}
            >
              {index + 1}
            </div>
            <div className="h-px w-full flex-1 bg-gray-600 last:hidden" />
          </Fragment>
        ))}
      </div>

      {/* Transitoning Content */}
      <div
        ref={contentRef}
        className="question-content translate-y-2.5 opacity-0"
      >
        {/* Eyebrow and title */}
        <div className="mb-14">
          <p className="mb-3 tracking-widest uppercase">
            Step {questionNumber}
          </p>
          <h2 className="font-display mb-6 text-4xl md:text-5xl lg:text-6xl">
            {question.question_text}
          </h2>
        </div>

        <fieldset className="mb-12">
          <legend className="sr-only">
            {question.question_text || "Select an option"}
          </legend>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
            {answers.map((answer, index) => (
              <Answer
                key={answer.value}
                index={index}
                imageField={getImageField(answer.value)}
                question={answer.text}
                value={answer.value}
                checked={selectedOption === answer.value}
                onChange={() => handleSelectAnswer(answer.value)}
              />
            ))}
          </div>
        </fieldset>

        <div className="mx-auto flex max-w-md items-center justify-between">
          <button
            onClick={handleBack}
            className="cursor-pointer border border-neutral-700 px-4 py-2 uppercase"
          >
            Back
          </button>
          <div className="text-center">
            {questionNumber} / {totalQuestions}
          </div>
          <button
            onClick={handleNext}
            className="cursor-pointer bg-white px-4 py-2 text-black uppercase"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

type AnswerProps = {
  imageField: ImageField | null;
  value: "Terra" | "Ignis" | "Aqua";
  question: string;
  index: number;
  checked?: boolean;
  onChange?: () => void;
};

const Answer = ({
  imageField,
  index,
  question,
  value,
  checked,
  onChange,
}: AnswerProps) => {
  const optionId = `option-${value}-${index}`;

  return (
    <div className="relative">
      <input
        type="radio"
        id={optionId}
        name="fragrance-option"
        value={value}
        className="peer absolute h-0 w-0 opacity-0"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={optionId}
        className={clsx(
          `answer-option answer-${value}`,
          "block h-full cursor-pointer border p-3 transition-all duration-300 peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-offset-1 peer-focus:ring-offset-black hover:border-white sm:p-4 md:p-6",
          checked ? "border-white" : "border-neutral-700",
        )}
      >
        <div className="relative mx-auto mb-2 aspect-square w-full sm:mb-3 sm:max-w-44 md:max-w-none">
          <PrismicNextImage
            field={imageField}
            width={200}
            height={200}
            fill
            className="object-cover"
            fallback={
              <div
                className={clsx(
                  "h-full w-full",
                  value === "Terra" && "bg-lime-800",
                  value === "Ignis" && "bg-amber-800",
                  value === "Aqua" && "bg-cyan-800",
                )}
              />
            }
          />
        </div>
        <p className="text-xl text-balance">{question}</p>
      </label>
    </div>
  );
};
