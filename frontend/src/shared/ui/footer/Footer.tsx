import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Slide, Zoom } from 'react-awesome-reveal';

import { getStrapiMedia } from '../../../../lib/media';
import { ApiFooterFooter } from '../../../../schemas';
import { InstagramPosts } from '../instagram-posts/InstagramPosts';
import { Socials } from '../socials/Socials';
import { useIntl } from 'react-intl';

type Props = {
  type: 'light' | 'dark';
  footer: ApiFooterFooter;
};

export const Footer = ({ type, footer }: Props) => {
  const isDark = type === 'dark';
  const isLight = type === 'light';

  const singleImage = footer.attributes.Logo_black;
  const secondImage = footer.attributes.Logo_gold;

  const intl = useIntl();

  const getLogoUrl = () => {
    if (type === 'light') {
      return getStrapiMedia(singleImage);
    }

    return getStrapiMedia(secondImage);
  };

  return (
    <footer
      className={cn(
        'relative bg-no-repeat bg-cover bg-center pb-20 md:pb-28',
        { 'bg-white': isLight },
        { 'bg-black': isDark },
      )}
    >
      <div className="pt-12">
        <InstagramPosts />
      </div>

      <Slide triggerOnce direction="up">
        <Socials type={type} />
      </Slide>

      <Zoom triggerOnce>
        <Link href="/">
          <div className="relative max-w-sm mx-auto h-20 mb-10 duration-300 hover:scale-105">
            <Image
              alt="Alchemist Logo"
              src={getLogoUrl()}
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </Zoom>

      <div className="flex flex-col justify-center items-center">
        <Slide triggerOnce direction="up">
          <p
            className={cn(
              'max-w-sm text-sm italic font-times text-center',
              { 'text-black': isLight },
              { 'text-ice-cream-parlour': isDark },
            )}
          >
            {footer.attributes.Description}
          </p>
        </Slide>

        <Slide triggerOnce direction="up">
          <p
            className={cn(
              'max-w-sm text-sm italic font-times text-center',
              { 'text-black': isLight },
              { 'text-ice-cream-parlour': isDark },
            )}
          >
            {footer.attributes.locate}
          </p>
        </Slide>

        <Slide triggerOnce direction="up" className="mt-2">
          <Link
            href="/impressum"
            rel="noopener noreferrer"
            className={cn(
              'text-sm italic font-times duration-300 hover:scale-105 max-w-sm block',
              { 'text-black': isLight },
              { 'text-ice-cream-parlour': isDark },
            )}
          >
            Impressum
          </Link>
        </Slide>

        <Slide triggerOnce direction="up" className="mt-2">
          <Link
            href="/privacy-policy"
            rel="noopener noreferrer"
            className={cn(
              'text-sm italic font-times duration-300 hover:scale-105 max-w-sm block',
              { 'text-black': isLight },
              { 'text-ice-cream-parlour': isDark },
            )}
          >
            {intl.formatMessage({ id: 'footer.policy' })}
          </Link>
        </Slide>

        <Slide triggerOnce direction="up" className="mt-2">
          <Link
            href="/faqs"
            className={cn(
              'text-sm italic font-times duration-300 hover:scale-105 max-w-sm block ml-2',
              { 'text-black': isLight },
              { 'text-ice-cream-parlour': isDark },
            )}
          >
            {intl.formatMessage({ id: 'footer.faq' })}
          </Link>
        </Slide>
      </div>
    </footer>
  );
};
