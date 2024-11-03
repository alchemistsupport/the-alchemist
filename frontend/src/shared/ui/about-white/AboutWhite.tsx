import Image from 'next/image';
import { Slide, Zoom } from 'react-awesome-reveal';

import { ApiHomepageHomepage } from '../../../../schemas';
import { OpenTableWidget } from '../open-table-widget/OpenTableWidget';
import { Text } from '../text/Text';

type Props = {
  data: ApiHomepageHomepage['attributes']['about_light'];
  locale: string
};

export const AboutWhite = ({ data, locale }: Props) => {
  return (
    <section className="bg-about-light bg-no-repeat bg-cover bg-center relative z-10 py-24">
      <Slide triggerOnce direction="up">
        <OpenTableWidget className='mb-2 h-[200px]' />
        <p
          className="text-center w-1/2 mx-auto mb-20 box-border mt-40 text-lg font-semibold uppercase md:mt-0 md:text-xl"
        >
          {locale === 'en' ? 'Our bar and terrace are always open for walk ins, So head on down and we will seat you as soon as we can.' : 'Unsere Bar und Terrasse sind immer für Laufkundschaft geöffnet. Also kommen Sie vorbei und wir werden Ihnen so schnell wie möglich einen Platz anbieten.'}
        </p>
      </Slide>

      <div className="section">
        <div className="relative w-full flex flex-row justify-center items-center m-auto">
          <Zoom triggerOnce>
            <Image
              alt={data.primary_image.name}
              src={data.primary_image.url}
              width={650}
              height={550}
              className="mx-auto z-50"
            />
          </Zoom>
        </div>

        <div className="flex flex-col items-center md:-translate-y-20">
          <Slide triggerOnce direction="up">
            <Text
              as="h2"
              textVariant="stroke-xl"
              textColor="white"
              className="text-center mt-6 max-w-5xl"
            >
              {data.about}
            </Text>
          </Slide>

          <Slide triggerOnce direction="up">
            <Text as="p" textVariant="h2-xl" className="text-center mt-6">
              {data.body_text}
            </Text>
          </Slide>

          <Slide triggerOnce direction="up">
            <Text
              as="p"
              textVariant="base"
              className="text-center max-w-lg mt-6"
            >
              {data.description}
            </Text>
          </Slide>
        </div>
      </div>
    </section>
  );
};
