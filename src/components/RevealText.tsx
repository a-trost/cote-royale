"use client";

import { useGSAP } from "@gsap/react";
import { asText, RichTextField } from "@prismicio/client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealTextProps = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: React.ElementType;
  duration?: number;
  align?: "center" | "start" | "end";
  triggerStart?: string;
  triggerEnd?: string;
};

export const RevealText = ({
  field,
  className,
  id,
  staggerAmount = 0.1,
  as: Component = "div",
  duration = 0.8,
  align = "start",
  triggerStart = "top 80%",
  triggerEnd = "bottom 20%",
}: RevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const words = asText(field).split(" ");

  useGSAP(
    () => {
      if (!ref.current) return;
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text__word", {
          y: 0,
          stagger: staggerAmount,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: triggerStart,
            end: triggerEnd,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".reveal-text__word", {
          opacity: 1,
          duration: 0.5,
          ease: "none",
          y: 0,
          stagger: 0,
          scrollTrigger: {
            trigger: ref.current,
            start: triggerStart,
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Component
      ref={ref}
      className={clsx(
        "reveal-text text-balance",
        align === "center" && "text-center",
        align === "end" && "text-right",
        align === "start" && "text-left",
        className,
      )}
    >
      {words.map((word, index) => (
        <span
          className="mb-0 inline-block overflow-hidden"
          key={`${id}-${word}-${index}`}
        >
          <span className="reveal-text__word mt-0 inline-block translate-y-full pb-3 will-change-transform">
            {word}
            {index < words.length - 1 ? <>&nbsp;</> : null}
          </span>
        </span>
      ))}
    </Component>
  );
};
