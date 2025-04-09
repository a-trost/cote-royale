import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";
import { ButtonLink } from "@/components/ButtonLink";
import { RevealText } from "@/components/RevealText";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        className="absolute inset-0 scale-125"
        vars={{ delay: 0, duration: 5, scale: 1, opacity: 0.5 }}
      >
        <PrismicNextImage
          field={slice.primary.image}
          priority
          fill
          alt=""
          className="object-cover motion-reduce:opacity-50"
        />
      </FadeIn>
      <div className="relative flex h-screen flex-col justify-center">
        <RevealText
          id={"hero-heading"}
          className="font-display max-w-xl text-6xl leading-tight text-neutral-50 md:text-7xl lg:text-8xl"
          field={slice.primary.heading}
          as={"h1"}
          staggerAmount={0.2}
          duration={1.7}
        />

        <FadeIn
          className="mt-6 max-w-md translate-y-8 text-lg text-neutral-100"
          vars={{
            delay: 1,
            duration: 1.3,
          }}
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>

        <FadeIn
          className="mt-8 flex translate-y-5"
          vars={{ delay: 1.7, duration: 1.1 }}
        >
          {slice.primary.button.map((link) => (
            <ButtonLink key={link.key} field={link} variant={link.variant} />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;
