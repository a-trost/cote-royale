import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { asText, isFilled } from "@prismicio/client";

import { createClient } from "@/prismicio";

import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { FragranceAttributes } from "@/components/FragranceAttributes";
import { formatPrice } from "@/utils/formatters";
import { HiStar } from "react-icons/hi2";
import { OtherFragrances } from "@/components/OtherFragrances";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const fragrance = await client
    .getByUID("fragrance", uid)
    .catch(() => notFound());

  return (
    <Bounded className="py-10">
      <div className="grid grid-cols-1 items-center gap-10 pb-10 lg:grid-cols-2">
        <div className="relative mb-14 flex justify-center pb-10">
          <PrismicNextImage
            field={fragrance.data.bottle_image}
            width={600}
            height={600}
            priority
            className="absolute top-[90%] -scale-y-100 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0)_70%,rgba(0,0,0,.15)_100%)]"
          />

          <PrismicNextImage
            field={fragrance.data.bottle_image}
            width={600}
            height={600}
            priority
            className="relative"
          />
        </div>

        {/* Product info section */}
        <div className="text-white">
          <h1 className="font-display mb-4 border-b border-neutral-700 pb-2 text-4xl md:text-5xl">
            <PrismicText field={fragrance.data.title} fallback="FRAGRANCE" />
          </h1>

          <div className="space-y-6">
            <p className="text-md font-semibold">Eau de Parfum Spray</p>

            <PrismicRichText field={fragrance.data.description} />

            <FragranceAttributes
              scentProfile={fragrance.data.scent_profile}
              mood={fragrance.data.mood}
              className="mt-4"
            />

            <p className="mt-10 text-3xl font-light">
              {formatPrice(fragrance.data.price)}
            </p>

            <button className="w-full bg-white py-3 font-medium text-black uppercase transition hover:bg-neutral-200">
              Add to Bag
            </button>

            <div className="flex items-center gap-4 border-t border-neutral-700 pt-6">
              <a href="#" className="hover:text-neutral-300">
                763 total reviews
              </a>
              <div className="flex">
                {[...Array(4)].map((_, i) => (
                  <HiStar key={i} className="h-5 w-5 text-white" />
                ))}
                <HiStar className="h-5 w-5 text-white/50" />
              </div>
              <span>4.4/5</span>
            </div>
          </div>
        </div>
      </div>

      <OtherFragrances currentFragranceUid={uid} />
    </Bounded>
  );
}

export async function generateMetadata(
  props: { params: Promise<Params> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { uid } = await props.params;
  const client = createClient();
  const fragrance = await client
    .getByUID("fragrance", uid)
    .catch(() => notFound());

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${asText(fragrance.data.title) || "Fragrance"} | Côte Royale `,
    description: `Discover ${asText(fragrance.data.title) || "Fragrance"}, the newest fragrance from Côte Royale Paris.`,
    openGraph: {
      images: isFilled.image(fragrance.data.og_image)
        ? [fragrance.data.og_image.url, ...previousImages]
        : previousImages.length > 0
          ? previousImages
          : [],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("fragrance");

  return pages.map((page) => ({ uid: page.uid }));
}
