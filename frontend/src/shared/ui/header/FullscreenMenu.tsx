import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { getStrapiMedia } from '../../../../lib/media';
import { ApiScreenmenuScreenmenu } from '../../../../schemas';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: ApiScreenmenuScreenmenu;
};

export const FullscreenMenu = ({ open, setOpen, data }: Props) => {
  return (
    <nav
      className={classNames('overlay bg-black', {
        'w-full': open,
        'w-0': !open,
      })}
    >
      <div className="h-full flex justify-center items-end relative">
        <div className="relative w-full max-w-sm h-5/6">
          <Image
            alt="Vacancy"
            src={getStrapiMedia(data.attributes.image)}
            fill
            className="object-cover opacity-40"
          />
        </div>

        <div className="flex w-[300px] md:w-full flex-col gap-10 text-center absolute top-1/2 -translate-y-1/2">
          {data.attributes.navigation.map(
            (link: { id: string; title: string; url: string }) => (
              <li key={link.id}>
                <Link
                  href={link.url}
                  onClick={() => setOpen(false)}
                  className="text-2xl sm:text-3x md:text-7xl uppercase tracking-[4px] font-goodSans text-ice-cream-parlour"
                >
                  <span className="link link-underline link-underline-ice text-ice-cream-parlour">
                    {link.title}
                  </span>
                </Link>
              </li>
            ),
          )}
        </div>

        <div className="section absolute bottom-[30px] flex justify-center md:justify-between items-center w-full">
          <Link
            href="mailto:kontakt@thealchemist.de"
            className="uppercase m-auto text-center font-goodSans font-medium text-lg text-ice-cream-parlour py-[10px]"
          >
            <span className="link link-underline link-underline-ice text-ice-cream-parlour p-1">
              {data.attributes.mail}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
