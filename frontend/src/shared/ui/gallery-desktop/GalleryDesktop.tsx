import 'yet-another-react-lightbox/styles.css';
import { mapImages } from '@ab/shared/utils/map-images';
import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import Lightbox from 'yet-another-react-lightbox';

import { ApiHomepageHomepage } from '../../../../schemas';

type Props = {
  data: ApiHomepageHomepage;
};

export const GalleryDesktop = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const preparedData = mapImages(data.images);
  const partialImages = preparedData.length / 2;
  const leftColumnImages = preparedData.slice(0, partialImages);
  const rightColumnImages = preparedData.slice(
    partialImages,
    partialImages * 2 + 1,
  );

  return (
    <section className="hidden md:block">
      <div
        className={cn(
          'flex gap-5 justify-center',
          { 'h-[45vh]': leftColumnImages.length <= 2 },
          { 'h-[67vh]': leftColumnImages.length === 3 },
          { 'h-[130vh]': leftColumnImages.length >= 4 },
        )}
      >
        <div className="grid grid-cols-1 gap-5 -translate-y-[20rem]">
          {leftColumnImages.map((img, index) => (
            <Slide triggerOnce direction="up" key={index}>
              <button
                className="w-[300px] h-[350px] overflow-hidden relative"
                onClick={() => setOpen(true)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="cursor-pointer duration-300 hover:opacity-80 hover:shadow-lg hover:scale-110 object-cover"
                />
              </button>
            </Slide>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 -translate-y-[10rem]">
          {rightColumnImages.map((img, index) => (
            <Slide triggerOnce direction="up" key={index}>
              <button
                className="w-[300px] h-[350px] overflow-hidden relative"
                onClick={() => setOpen(true)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="cursor-pointer duration-300 hover:opacity-80 hover:shadow-lg hover:scale-110 object-cover"
                />
              </button>
            </Slide>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={preparedData}
      />
    </section>
  );
};
