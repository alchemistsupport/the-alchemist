import Image from 'next/image';
import { useIntl } from 'react-intl';
import Slider from 'react-slick';

import { ApiHomepageHomepage } from '../../../../../../schemas';

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 1,
  speed: 500,
};

type Props = {
  data: ApiHomepageHomepage['attributes']['menus'];
};

export const CarouselMobile = ({ data }: Props) => {
  const intl = useIntl();

  const preparedData = [
    {
      link: data[0].url,
      bgColor: 'bg-legendary',
      textColor: 'text-offbeat',
      text: intl.formatMessage({ id: 'carousel.food' }),
      alt: data[0].image.name as string,
      src: data[0].image.url as string,
    },
    {
      link: data[1].url,
      bgColor: 'bg-charon',
      textColor: 'text-hailstorm-grey',
      text: intl.formatMessage({ id: 'carousel.brunch' }),
      alt: data[1].image.name as string,
      src: data[1].image.url as string,
    },
    {
      link: data[2].url,
      bgColor: 'bg-ocean-drive',
      textColor: 'text-whales-mouth',
      text: intl.formatMessage({ id: 'carousel.drinks' }),
      alt: data[2].image.name as string,
      src: data[2].image.url as string,
    },
  ];

  return (
    <div className="md:hidden menus-slider-mobile">
      <Slider {...settings}>
        {preparedData.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-[50px] ${item.bgColor} relative cursor-pointer transition duration-300 ease-in-out hover:scale-105`}
          >
            <h3
              className={`text-3xl tracking-[12px] uppercase font-adieu ${item.textColor} mt-32 mb-80 ${item.bgColor} text-center`}
            >
              {item.text}
            </h3>

            <div className="absolute w-full h-48 md:h-60 top-[190px]">
              <Image
                alt={item.alt}
                src={item.src}
                fill
                className="object-contain"
              />
            </div>
          </a>
        ))}
      </Slider>
    </div>
  );
};
