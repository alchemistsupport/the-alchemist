import { useWindowSize } from '@ab/shared/hooks';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { FullscreenMenu } from './FullscreenMenu';
import { getStrapiMedia } from '../../../../lib/media';
import { ApiScreenmenuScreenmenu, ApiHeaderHeader, ApiCampaignCampaign } from '../../../../schemas';
import { useDisableBodyScroll } from '../../hooks/useDisableBodyScroll';

type HeaderType = 'dark' | 'light';

type HeaderProps = {
  type: HeaderType;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
  campaign: ApiCampaignCampaign;
};

export const Header = ({ type, header, screenmenu, campaign }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const isLight = type === 'light';
  const isDark = type === 'dark';
  const isHome = router.route === '/';
  const isCampaign = router.route.includes('campaign')

  const window = useWindowSize();

  useDisableBodyScroll(open);

  const defaultClasses = {
    'bg-black': isLight,
    'bg-ice-cream-parlour': isDark,
    'bg-ice-cream-parlour lg:bg-black': isHome && isLight,
  };

  const bookBtnClasses = {
    'text-black': isLight,
    'text-ice-cream-parlour': isDark,
  };

  const activeBookBtnClasses = {
    'text-black': isLight,
    'border-ice-cream-parlour text-ice-cream-parlour': isDark,
    'text-ice-cream-parlour': open,
  };

  const activeClasses = (isOpposite?: boolean) => {
    return {
      'bg-ice-cream-parlour rotate-[-45deg] -translate-y-2': open,
      'rotate-[45deg] translate-y-1': open && isOpposite,
    };
  };

  const langBtnClasses = {
    'text-black': isLight,
    'text-ice-cream-parlour': isDark,
  };

  const langBtnActiveClasses = {
    'text-ice-cream-parlour': open,
  };

  const firstImage = header.first;
  const secondImage = header.second;
  const campaingImage = campaign?.headerImage;
  const updateLogo = campaign?.updateHeaderImage;

  const getLogoSrc = () => {
    if(isCampaign && updateLogo) {
      return getStrapiMedia(campaingImage);
    }

    if (isDark) {
      return getStrapiMedia(firstImage);
    }

    if ((window.width || 0) < 1024 && isHome && isLight) {
      return getStrapiMedia(firstImage);
    }

    return open ? getStrapiMedia(firstImage) : getStrapiMedia(secondImage);
  };

  const menuBtnClasses = (isOpposite?: boolean) =>
    cn('w-10 h-1', { ...(open ? activeClasses(isOpposite) : defaultClasses) });

  const locale = router.locale === 'en' ? 'de' : 'en';

  return (
    <header className="absolute z-40 w-full">
      <div className="lg:hidden h-14 bg-ice-cream-parlour flex">
        <Link
          href={router.asPath}
          locale={locale}
          className="flex-1 flex justify-center items-center text-base uppercase tracking-[2px] font-bold font-goodSans"
        >
          {locale}
        </Link>

        <button
          className="flex-1 flex justify-center items-center bg-black text-base uppercase tracking-[2px] text-ice-cream-parlour font-goodSans font-bold border-b-4 border-l-4 border-ice-cream-parlour"
          onClick={() => router.push('/book')}
        >
          {header.book}
        </button>
      </div>

      <div className=" py-4">
        <div className="section">
          <div className="flex flex-row items-center justify-between">
            <Link href="/" className="z-50">
              <Image
                alt="The Alchemist"
                src={getLogoSrc()}
                width={150}
                height={90}
              />
            </Link>

            <div className="flex flex-row items-center">
              <Link
                href={router.asPath}
                locale={locale}
                className={cn(
                  'mr-4 hidden lg:block bg-black text-center text-lg uppercase tracking-[2px] font-medium font-goodSans bg-transparent border-2 text-ice-cream-parlour border-ice-cream-parlour py-2 px-8 duration-300 hover:scale-105',
                  { ...(open ? langBtnActiveClasses : langBtnClasses) },
                )}
              >
                <span className="link link-underline link-underline-ice p-1">
                  {locale}
                </span>
              </Link>

              <button
                className={cn(
                  'hidden lg:block text-center bg-black text-lg uppercase tracking-[2px] font-medium font-goodSans bg-transparent border-2 text-ice-cream-parlour py-2 px-8 border-ice-cream-parlour duration-300 hover:scale-105',
                  { ...(open ? activeBookBtnClasses : bookBtnClasses) },
                )}
                onClick={() => router.push('/book')}
              >
                {header.book}
              </button>

              <button
                className="ml-16 flex flex-col gap-2 cursor-pointer duration-300 hover:scale-105 z-50"
                onClick={() => setOpen(!open)}
              >
                <div className={menuBtnClasses(true)} />
                <div className={menuBtnClasses()} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <FullscreenMenu open={open} setOpen={setOpen} data={screenmenu} />
    </header>
  );
};
