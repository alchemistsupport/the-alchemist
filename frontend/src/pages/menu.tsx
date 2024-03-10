import { GetStaticProps } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { Bounce, Slide } from 'react-awesome-reveal';

import { fetchAPI } from '../../lib/api';
import {
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
  ApiMenuMenu,
} from '../../schemas';
import { Layout, Button, Text, SignUpForm } from '../shared/ui';

type Props = {
  menu: ApiMenuMenu;
  footer: ApiFooterFooter;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
};

const Menu = ({ menu, footer, header, screenmenu }: Props) => {
  const {
    hero_banner,
    foodPrimaryImage,
    foodSecondaryImage,
    foodTextImage,
    drinksPrimaryImage,
    brunchPrimaryImage,
    foodPdfUrl,
    drinksPdfUrl,
    brunchPdfUrl,
  } = menu.attributes;

  const foodClick = () => window.open(foodPdfUrl, '_blank');

  const liquidsClick = () => window.open(drinksPdfUrl, '_blank');

  const brunchClick = () => window.open(brunchPdfUrl, '_blank');

  return (
    <Layout footer={footer} type="dark" screenmenu={screenmenu} header={header}>
      <NextSeo title="Menu" />

      <section className="section section-dark">
        <div className="w-full h-[80vh] relative flex justify-center items-center overflow-hidden">
          <Image
            alt={hero_banner.background_image.data.attributes.name}
            src={hero_banner.background_image.data.attributes.url}
            fill
            className="object-cover"
          />

          <Bounce className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px]">
            <Image
              src={hero_banner.primary_image.data.attributes.url}
              alt={hero_banner.primary_image.data.attributes.name}
              fill
              className="object-contain"
            />
          </Bounce>

          <div className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[400px] animate-spin-slow">
            <Image
              src={hero_banner.secondary_image.data.attributes.url}
              alt={hero_banner.secondary_image.data.attributes.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="text-center flex flex-col items-center">
          <Slide triggerOnce direction="up">
            <Text
              as="h1"
              textColor="beige"
              textVariant="heading"
              className="-translate-y-1/2"
            >
              {menu.attributes.title}
            </Text>
          </Slide>

          <Slide triggerOnce direction="up">
            <Text
              as="p"
              textColor="beige"
              textVariant="base"
              className="max-w-[400px] mt-14"
            >
              {menu.attributes.body}
            </Text>
          </Slide>

          <Slide triggerOnce direction="up">
            <Text
              as="h2"
              textColor="beige"
              textVariant="h2-xl"
              className="mt-12"
            >
              {menu.attributes.description}
            </Text>
          </Slide>

          <Slide triggerOnce direction="up">
            <Text
              as="h2"
              textColor="beige"
              textVariant="base"
              className="mt-12"
            >
              {menu.attributes.click}
            </Text>
          </Slide>

          <Slide triggerOnce direction="up">
            <Text
              as="p"
              textColor="beige"
              textVariant="h2-xl"
              className="mt-24"
            >
              {menu.attributes.food}
            </Text>
          </Slide>

          <div
            className="cursor-pointer relative w-full h-[420px] md:h-96 mt-12 md:mb-10"
            onClick={foodClick}
          >
            <div className="absolute w-full h-[250px] md:h-[370px]">
              <Image
                alt={foodPrimaryImage.data.attributes.name}
                src={foodPrimaryImage.data.attributes.url}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute w-full h-72 md:h-[420px] -top-[17px]">
              <Image
                alt={foodTextImage.data.attributes.name}
                src={foodTextImage.data.attributes.url}
                fill
                className="object-contain animate-spin-slow"
              />
            </div>
            <div className="absolute w-full h-72 md:h-96">
              <Image
                alt={foodSecondaryImage.data.attributes.name}
                src={foodSecondaryImage.data.attributes.url}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <Slide triggerOnce direction="up">
            <Text
              as="p"
              textColor="beige"
              textVariant="desc"
              className="my-10 max-w-[400px]"
            >
              {menu.attributes.foodDescription}
            </Text>
          </Slide>

          <Button
            type="submit"
            onClick={foodClick}
            name={menu.attributes.food_button}
            variant="secondary"
          />

          <Slide triggerOnce direction="up">
            <Text
              as="p"
              textColor="beige"
              textVariant="h2-xl"
              className="mt-24"
            >
              {menu.attributes.drinks}
            </Text>
          </Slide>

          <div
            className="relative w-72 md:w-full h-[420px] md:mt-12 cursor-pointer"
            onClick={liquidsClick}
          >
            <div className="absolute w-full h-[250px] md:h-[370px]">
              <Image
                alt={foodPrimaryImage.data.attributes.name}
                src={foodPrimaryImage.data.attributes.url}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute w-full h-72 md:h-[420px] -top-[17px]">
              <Image
                alt={foodTextImage.data.attributes.name}
                src={foodTextImage.data.attributes.url}
                fill
                className="object-contain animate-spin-slow"
              />
            </div>
            <div className="absolute w-full h-72 md:h-96">
              <Image
                alt={drinksPrimaryImage.data.attributes.name}
                src={drinksPrimaryImage.data.attributes.url}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <Slide triggerOnce direction="up">
            <Text
              as="p"
              textColor="beige"
              textVariant="desc"
              className="my-10 max-w-[600px]"
            >
              {menu.attributes.drinksDescription}
            </Text>
          </Slide>

          <Button
            type="submit"
            onClick={liquidsClick}
            name={menu.attributes.liquids_button}
            variant="secondary"
          />

          <Text as="p" textColor="beige" textVariant="h2-xl" className="mt-24">
            {menu.attributes.brunch}
          </Text>

          <div
            className="relative w-72 md:w-full h-[420px] md:mt-12 cursor-pointer"
            onClick={brunchClick}
          >
            <div className="absolute w-full h-[250px] md:h-[370px]">
              <Image
                alt={foodPrimaryImage.data.attributes.name}
                src={foodPrimaryImage.data.attributes.url}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute w-full h-72 md:h-[420px] -top-[17px]">
              <Image
                alt={foodTextImage.data.attributes.name}
                src={foodTextImage.data.attributes.url}
                fill
                className="object-contain animate-spin-slow"
              />
            </div>
            <div className="absolute w-full h-72 md:h-96">
              <Image
                alt={brunchPrimaryImage.data.attributes.name}
                src={brunchPrimaryImage.data.attributes.url}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <Slide triggerOnce direction="up">
            <Text
              as="p"
              textColor="beige"
              textVariant="desc"
              className="my-10 max-w-[600px]"
            >
              {menu.attributes.brunch_description}
            </Text>
          </Slide>

          <Button
            type="submit"
            onClick={brunchClick}
            name={menu.attributes.brunch}
            variant="secondary"
          />

          <SignUpForm data={menu.attributes.sign_up} />
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [menuRes, footerRes, headerRes, screenmenuRes] = await Promise.all([
    fetchAPI('/menu', {
      populate: {
        seo: '*',
        hero_banner: { populate: '*' },
        foodPrimaryImage: { populate: '*' },
        foodSecondaryImage: { populate: '*' },
        foodTextImage: { populate: '*' },
        drinksPrimaryImage: { populate: '*' },
        brunchPrimaryImage: { populate: '*' },
        title: '*',
        body: '*',
        name: '*',
        email: '*',
        phone: '*',
        enquiry: '*',
        click: '*',
        message: '*',
        brunch: '*',
        brunch_description: '*',
        liquids_button: '*',
        food_button: '*',
        submit: '*',
        loading: '*',
        sign_up: '*',
      },
      locale: context.locale,
    }),
    fetchAPI('/footer', {
      populate: {
        Logo_black: '*',
        Logo_gold: '*',
      },
      locale: context.locale,
    }),
    fetchAPI('/header', {
      populate: {
        first: '*',
        second: '*',
      },
      locale: context.locale,
    }),
    fetchAPI('/screenmenu', {
      populate: {
        image: '*',
        navigation: '*',
      },
      locale: context.locale,
    }),
  ]);

  return {
    props: {
      footer: footerRes.data,
      menu: menuRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
    },
    revalidate: 1,
  };
};

export default Menu;
