import { asText, Content } from "@prismicio/client";
import { FragranceType, Votes, Winner } from "./types";
import { FadeIn } from "@/components/FadeIn";
import { PrismicText } from "@prismicio/react";
import { formatPrice } from "@/utils/formatters";
import { ButtonLink } from "@/components/ButtonLink";
import { PrismicNextImage } from "@prismicio/next";
import { HiStar } from "react-icons/hi2";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type ResultsProps = {
  votes: Votes;
  fragrances: Content.FragranceDocument[];
  onRetakeQuiz: () => void;
};

export const Results = ({ votes, fragrances, onRetakeQuiz }: ResultsProps) => {
  const winners = determineWinners(votes, fragrances);

  useGSAP(() => {
    gsap.set(".bottle-image", {
      filter: "brightness(0) blur(10px)",
      opacity: 1,
    });

    const tl = gsap.timeline();

    tl.to(".result-item", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.5,
      ease: "power2.inOut",
    }).to(
      ".bottle-image",
      {
        duration: 1.7,
        filter: "brightness(1) blur(0px)",
        ease: "sine.in",
      },
      "-=0.8",
    );
  });

  const handleRetakeQuiz = () => {
    gsap.to(".results-container", {
      opacity: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        onRetakeQuiz();
      },
    });
  };

  return (
    <FadeIn
      vars={{
        duration: 0.8,
      }}
      className="results-container mx-auto translate-y-5 py-10 text-center"
    >
      <div className="mb-10">
        <p className="mb-3 tracking-widest uppercase">Results</p>
        <h2 className="font-display mb-6 text-5xl md:text-6xl">
          Your Personalized Recommendation
        </h2>
        <p className="mx-auto mb-12 max-w-lg text-lg text-balance text-gray-300">
          A unique selection of fragrances that are most suited to you and your
          personal taste.
        </p>
      </div>

      <div className="flex justify-center gap-10">
        {winners.map((winner, index) => {
          const fragrance = fragrances.find(
            (f) => asText(f.data.title) === winner.title,
          );

          if (!fragrance) return null;

          const formattedPrice = formatPrice(fragrance.data.price);

          return (
            <div
              key={index}
              className="result-item group max-w-md translate-y-5 text-left"
            >
              <div className="mt-40 mb-6 grid bg-neutral-200/10 transition-colors duration-700 group-hover:bg-neutral-200/20">
                <PrismicNextImage
                  field={fragrance.data.bottle_image}
                  className="bottle-image --blur-md -mt-40 max-w-96 -rotate-12 opacity-100 transition-all duration-700 group-hover:scale-110 group-hover:rotate-0 group-hover:brightness-125"
                  priority
                  imgixParams={{
                    width: 450,
                    height: 450,
                    dpr: 2,
                  }}
                />

                <div className="mt-6 p-6">
                  <div className="mb-2 flex items-center">
                    <span className="inline-flex items-center gap-1 text-white">
                      <HiStar /> <span>4.8</span>
                    </span>
                  </div>

                  <h3 className="font-display mb-2 text-3xl">
                    <PrismicText field={fragrance.data.title} />
                  </h3>
                  <p className="mb-8 text-lg font-semibold">{formattedPrice}</p>

                  <div className="mb-6">
                    <ButtonLink document={fragrance} className="w-full">
                      View Details
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <button
          onClick={handleRetakeQuiz}
          className="inline-block cursor-pointer border border-white px-12 py-4 font-extrabold tracking-wider text-white uppercase transition-colors hover:bg-white/10"
        >
          Retake Quiz
        </button>
      </div>
    </FadeIn>
  );
};

const determineWinners = (
  votes: Votes,
  fragrances: Content.FragranceDocument[],
): Winner[] => {
  // Find the highest vote count
  const maxVotes = Math.max(votes.Terra, votes.Ignis, votes.Aqua);

  const winningTypes: FragranceType[] = [];

  if (votes.Terra === maxVotes) winningTypes.push("Terra");
  if (votes.Ignis === maxVotes) winningTypes.push("Ignis");
  if (votes.Aqua === maxVotes) winningTypes.push("Aqua");

  // If tie, show up to two winners

  return winningTypes.slice(0, 2).map((fragranceType) => {
    const fragrance = fragrances.find((f) =>
      asText(f.data.title)?.toLowerCase().includes(fragranceType.toLowerCase()),
    );

    return {
      fragranceType,
      title: asText(fragrance?.data.title) || fragranceType,
      uid: fragrance?.uid,
    };
  });
};
