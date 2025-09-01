import Image from 'next/image';
import { useIntl } from 'react-intl';
import Slider from 'react-slick';

import { ApiHomepageHomepage } from '../../../../../../schemas';

const settings = {
  dots: false,
  arrows: false,
  centerMode: true,
  infinite: true,
  centerPadding: '30%',
  slidesToShow: 1,
  speed: 500,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        centerPadding: '60px',
      },
    },
  ],
};

type Props = {
  data: ApiHomepageHomepage['attributes']['menus'];
};

export const CarouselDesktop = ({ data }: Props) => {
  const intl = useIntl();

  return (
    <div className="hidden md:block mb-8 menus-slider-pc">
      <Slider {...settings}>
        <div>
          <a
            href={data[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative cursor-pointer transition duration-300 ease-in-out hover:opacity-90"
          >
            <h3 className="text-4xl tracking-[5px] uppercase font-adieu text-ice-cream-parlour mb-4 text-center react-slick__header menus-slider-pc__title">
              {data[0].title}
            </h3>

            <div className="text-ice-cream-parlour font-adieu text-center mb-10 uppercase duration-300 hover:opacity-20">
              {intl.formatMessage({ id: 'carousel.menu' })}
            </div>

            <div className="relative w-full h-96 mb-10">
              <Image
                alt={data[0].secondary_image.name}
                src={`${process.env.NEXT_PUBLIC_API_URL}${data[0].secondary_image.url}`}
                fill
                className="object-contain"
              />

              <div className="absolute w-full h-[420px] -top-[17px] animate-spin-slow">
                <Image
                  alt={data[0].text_image.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data[0].text_image.url}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute w-full h-96 z-50">
                <Image
                  alt={data[0].image.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data[0].image.url}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </a>
        </div>

        <div>
          <a
            href={data[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative cursor-pointer transition duration-300 ease-in-out hover:opacity-90"
          >
            <h3 className="text-4xl tracking-[5px] uppercase font-adieu text-ice-cream-parlour mb-4 text-center react-slick__header menus-slider-pc__title">
              {data[1].title}
            </h3>

            <div className="text-ice-cream-parlour font-adieu text-center uppercase mb-6 duration-300 hover:opacity-20">
              {intl.formatMessage({ id: 'carousel.menu' })}
            </div>

            <div className="relative w-full h-96 mb-10">
              <Image
                alt={data[0].secondary_image.name}
                src={`${process.env.NEXT_PUBLIC_API_URL}${data[0].secondary_image.url}`}
                fill
                className="object-contain"
              />

              <div className="absolute w-full h-[420px] -top-[17px] animate-spin-slow">
                <Image
                  alt={data[0].text_image.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data[0].text_image.url}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute w-full h-96 z-50">
                <Image
                  alt={data[1].image.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data[1].image.url}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </a>
        </div>

        <div>
          <a
            href={data[2].url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative cursor-pointer transition duration-300 ease-in-out hover:opacity-90"
          >
            <h3 className="text-4xl tracking-[5px] uppercase font-adieu text-ice-cream-parlour mb-4 text-center react-slick__header menus-slider-pc__title ">
              {data[2].title}
            </h3>

            <div className="text-ice-cream-parlour font-adieu text-center uppercase mb-6 duration-300 hover:opacity-20">
              {intl.formatMessage({ id: 'carousel.menu' })}
            </div>

            <div className="relative w-full h-96 mb-10">
              <Image
                alt={data[0].secondary_image.name}
                src={`${process.env.NEXT_PUBLIC_API_URL}${data[0].secondary_image.url}`}
                fill
                className="object-contain"
              />

              <div className="absolute w-full h-[420px] -top-[17px] animate-spin-slow">
                <Image
                  alt={data[0].text_image.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data[0].text_image.url}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute w-full h-96 z-50">
                <Image
                  alt={data[2].image.name}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data[2].image.url}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </a>
        </div>
      </Slider>
    </div>
  );
};
