import { Slide } from 'react-awesome-reveal';

import { CarouselMobile, CarouselDesktop } from './ui';
import { ApiHomepageHomepage } from '../../../../schemas';
import { Text } from '../text/Text';

type Props = {
  data: ApiHomepageHomepage['attributes']['menus'];
};

export const Menus = ({ data }: Props) => {
  return (
    <section className="min-h-screen bg-about-dark bg-no-repeat bg-cover bg-center relative py-44">
      <div className="flex items-center flex-col">
        <Slide triggerOnce direction="up">
          <Text as="h1" textColor="beige" textVariant="stroke-xl">
            {data.description}
          </Text>
        </Slide>

        <Slide triggerOnce direction="up">
          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="max-w-lg text-center py-10"
          >
            {data.body_text}
          </Text>
        </Slide>
      </div>

      <CarouselMobile data={data.gallery_mobile} />

      <CarouselDesktop data={data.gallery_pc} />
    </section>
  );
};
