import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';

import { ApiModalModal } from '../../../../schemas';
import { Markdown } from '../markdown/Markdown';

type Props = {
  data: ApiModalModal['attributes'];
};

const Modal = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    big_circle,
    text_image,
    image_in_the_middle,
    open,
    description,
    delay,
    book,
    button_image,
    small_circle,
  } = data;

  const handleClose = () => {
    setIsOpen(false);

    localStorage.setItem('modalClosed', 'true');
  };

  useEffect(() => {
    const modalClosed = localStorage.getItem('modalClosed');

    setTimeout(() => {setIsOpen(modalClosed !== 'true')}, delay * 1000);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="absolute inset-0 bg-black opacity-75 cursor-pointer"
          onClick={handleClose}
        />

        <div className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] flex justify-center items-center">
          <div className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px]">
            <Image
              src={big_circle.url}
              fill
              alt={big_circle.name}
              className="object-contain"
            />
          </div>

          <div className="absolute w-[330px] h-[330px] sm:w-[460px] sm:h-[460px] animate-spin-slow">
            <Image
              src={text_image.url}
              alt={text_image.name}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute w-[300px] h-[300px] sm:w-[300px] sm:h-[300px]">
            <Image
              src={image_in_the_middle.url}
              alt={image_in_the_middle.name}
              fill
              className="object-contain"
            />
          </div>


          {/* <div className="absolute w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] top-[141px] sm:top-[205px]">
            <Image
              src={small_circle.url}
              alt={small_circle.name}
              fill
              className="object-contain"
            />
          </div> */}

          <div className='absolute rounded-full bg-[#00000080] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] ' ></div>
          <div className='absolute rounded-full border-2 border-white w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] ' ></div>
          <div className='absolute rounded-full w-[400px] h-[400px] flex flex-col align-center justify-center text-center' >
            <Link href={book} onClick={handleClose}>
              <h2 className='text-white text-4xl border-b-2 max-w-[200px] mx-auto mb-4 font-semibold uppercase'>{open}</h2>
            </Link>   
            <p className='text-white text-center text-2xl px-[120px]'>{description}</p>
          </div>

          {/* <div className="absolute w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] top-[145px] sm:top-[210px] cursor-pointer">
            <Zoom triggerOnce>
              <Link href="/sign-up" onClick={handleClose}>
                <Image
                  src={button_image.url}
                  alt={button_image.name}
                  width={110}
                  height={110}
                />
                <h2 className='text-white text-3xl'>SIGN UP</h2>
              </Link>
            </Zoom>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export { Modal };
