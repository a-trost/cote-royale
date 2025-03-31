"use client";

import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
};

export const FadeIn = ({
  children,
  start,
  vars = {},
  className,
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      let mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ref.current, {
          opacity: 1,
          duration: 5,
          ease: "power3.out",
          y: 0,
          ...vars,
          scrollTrigger: {
            trigger: ref.current,
            start: start || "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(ref.current, {
          opacity: 1,
          duration: 0.5,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={clsx("opacity-0", className)}>
      {children}
    </div>
  );
};
