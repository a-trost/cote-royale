import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { RevealText } from "@/components/RevealText";
import { ButtonLink } from "@/components/ButtonLink";
import { Bounded } from "@/components/Bounded";
import { FadeIn } from "@/components/FadeIn";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden bg-[url('/background.avif')] bg-cover bg-center py-16 text-gray-50 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
        <FadeIn
          className="translate-y-2 text-sm font-light tracking-[.2em] uppercase"
          vars={{ duration: 0.8 }}
        >
          {slice.primary.eyebrow}
        </FadeIn>
        <RevealText
          id="cta-heading"
          as={"h2"}
          field={slice.primary.heading}
          className="font-display mx-auto max-w-3xl sm:text-6xl md:text-7xl"
          align="center"
          staggerAmount={0.1}
          triggerStart="top 80%"
          duration={0.8}
        />

        <FadeIn
          vars={{ duration: 0.8, delay: 0.4 }}
          start="top 80%"
          className="mx-auto max-w-2xl translate-y-2 text-lg text-gray-300"
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>
        <div className="mt-10">
          {slice.primary.button.map((link, index) => (
            <FadeIn
              key={link.key}
              start="top 80%"
              className="translate-y-8"
              vars={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
            >
              <ButtonLink field={link} className={link.variant} />
            </FadeIn>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default CallToAction;
