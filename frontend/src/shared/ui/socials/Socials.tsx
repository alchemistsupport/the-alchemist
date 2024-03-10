import Link from 'next/link';
import { IconContext } from 'react-icons';
import { BsInstagram, BsYoutube } from 'react-icons/bs';
import { FaFacebookF, FaTiktok } from 'react-icons/fa';

type SocialProps = {
  type: 'light' | 'dark';
};

export const Socials = ({ type }: SocialProps) => {
  const iconsColor = type === 'light' ? 'black' : '#f7d2ae';

  return (
    <IconContext.Provider value={{ color: iconsColor, size: '30px' }}>
      <div className="flex justify-center items-center mb-20 gap-2">
        <Link
          target="_blank"
          href="https://www.instagram.com/thealchemistde/"
          className="cursor-pointer p-1 duration-300 hover:scale-105 block"
        >
          <BsInstagram />
        </Link>

        <Link
          target="_blank"
          href="https://www.tiktok.com/@thealchemistuk"
          className="cursor-pointer p-1 duration-300 hover:scale-105 block"
        >
          <FaTiktok />
        </Link>

        <Link
          target="_blank"
          href="https://www.facebook.com/TheAlchemistPotsdamerPlatz"
          className="cursor-pointer p-1 duration-300 hover:scale-105 block"
        >
          <FaFacebookF />
        </Link>

        <Link
          target="_blank"
          href="https://www.youtube.com/channel/UCYOZ6HfDFBJU2PfbWpTDGvg/videos"
          className="cursor-pointer p-1 duration-300 hover:scale-105 block"
        >
          <BsYoutube />
        </Link>
      </div>
    </IconContext.Provider>
  );
};
