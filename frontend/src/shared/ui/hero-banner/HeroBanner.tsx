import Lottie from 'lottie-react';
import Image from 'next/image';
import React from 'react';
import { Zoom } from 'react-awesome-reveal';

import smoke from './smoke.json';
import { ApiHomepageHomepage } from '../../../../schemas';

type Props = {
  data: ApiHomepageHomepage;
};

export const HeroBanner = ({ data }: Props) => {
  return (
    <section className="flex flex-row items-center justify-center bg-ice-cream-parlour relative bg-gradient-to-b from-ice-cream-parlour to-allspice">
      <div className="relative w-full lg:w-[900px] h-screen flex flex-row items-center justify-center">
        <Image
          alt={`${process.env.NEXT_PUBLIC_API_URL}${data.background_image.name}`}
          src={`${process.env.NEXT_PUBLIC_API_URL}${data.background_image.url}`}
          fill
          className="object-cover"
        />

        <div className="absolute bottom-[-10px]">
          <Lottie animationData={smoke} loop />
        </div>

        <Zoom triggerOnce>
          <Image
            alt={`${process.env.NEXT_PUBLIC_API_URL}${data.primary_image.name}`}
            src={`${process.env.NEXT_PUBLIC_API_URL}${data.primary_image.url}`}
            width={700}
            height={700}
            className="px-5 object-contain mx-auto z-20"
          />
        </Zoom>
      </div>
    </section>
  );
};
