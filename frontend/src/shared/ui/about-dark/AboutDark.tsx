import { mapImages } from '@ab/shared/utils/map-images';
import Image from 'next/image';
import { useState } from 'react';
import { Slide, Zoom } from 'react-awesome-reveal';
import Slider from 'react-slick';
import Lightbox from 'yet-another-react-lightbox';

import { ApiHomepageHomepage } from '../../../../schemas';
import { Text } from '../text/Text';

type Props = {
  data: ApiHomepageHomepage['attributes']['about_light'];
  images: ApiHomepageHomepage['attributes']['gallery'];
};

const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  centerMode: true,
  centerPadding: '0px',
  slidesToShow: 1,
  speed: 500,
};

export const AboutDark = ({ data, images }: Props) => {
  const [open, setOpen] = useState(false);
  const preparedData = mapImages(images.images.data);

  return (
    <>
      <section className="section md:hidden bg-about-dark bg-no-repeat bg-cover bg-center">
        <div className="relative mx-auto pt-12 w-[320px] h-[500px] z-10 mb-10">
          <Slider {...settings}>
            {preparedData.map((img, index) => (
              <div key={index}>
                <button
                  className="w-full flex mx-auto h-[400px] overflow-hidden relative"
                  onClick={() => setOpen(true)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="cursor-pointer duration-300 hover:opacity-80 hover:shadow-lg hover:scale-110 object-cover"
                  />
                </button>
              </div>
            ))}
          </Slider>
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={preparedData}
        />

        <div className="relative w-full flex justify-center mb-8">
          <Zoom triggerOnce>
            <Image
              src={data.secondary_image.data.attributes.url}
              alt={data.secondary_image.data.attributes.name}
              width={300}
              height={150}
            />
          </Zoom>

          <Zoom triggerOnce className="absolute -top-2 z-20">
            <Image
              src={data.primary_image.data.attributes.url}
              alt={data.primary_image.data.attributes.name}
              width={400}
              height={150}
            />
          </Zoom>

          <Slide triggerOnce direction="up" className="absolute bottom-3 z-10 ">
            <Text
              as="h2"
              textVariant="stroke-xl"
              className="text-ice-cream-parlour"
            >
              {data.description}
            </Text>
          </Slide>
        </div>

        <Slide triggerOnce direction="up">
          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center pb-12 max-w-xl m-auto"
          >
            {data.body_text}
          </Text>
        </Slide>
      </section>

      <section className="hidden md:block relative pt-[325px] pb-24 bg-gradient-to-b from-black to-black-sheep">
        <Zoom triggerOnce className="absolute w-full h-96 top-[250px] z-10">
          <Image
            alt={data.primary_image.data.attributes.name}
            src={data.primary_image.data.attributes.url}
            fill
            className="object-contain"
          />
        </Zoom>

        <Slide triggerOnce direction="up">
          <Text
            as="h2"
            textVariant="stroke-xl"
            textColor="beige"
            className="mt-20 md:mt-12"
          >
            {data.description}
          </Text>
        </Slide>

        <Slide triggerOnce direction="up">
          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="max-w-lg mt-40 text-center m-auto"
          >
            {data.body_text}
          </Text>
        </Slide>
      </section>
    </>
  );
};
