"use client";

import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  className?: string;
};

export const FadeIn = ({ children, vars = {}, className }: FadeInProps) => {
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
