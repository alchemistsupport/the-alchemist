import { GetStaticProps } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Bounce } from 'react-awesome-reveal';

import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import {
  ApiContactContact,
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
} from '../../schemas';
import { Layout, Text, Map, ContactUsForm } from '../shared/ui';
import Link from 'next/link';

type Props = {
  footer: ApiFooterFooter;
  contact: ApiContactContact;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
  locale: string
};
const Contact = ({ footer, contact, header, screenmenu, locale }: Props) => {
  const firstImage = contact.first;
  const secondImage = contact.second;
  console.log(contact.seo)
  return (
    <Layout type="dark" footer={footer} header={header} screenmenu={screenmenu}>
      <NextSeo title={contact.seo?.metaTitle} />
      <NextSeo description={contact.seo?.metaDescription} />

      <section className="section section-dark">
        <div className="flex flex-row justify-center items-center pt-40">
          <Bounce triggerOnce>
            <Image
              width={400}
              height={400}
              src={getStrapiMedia(firstImage)}
              alt="Triangle"
            />
          </Bounce>

          <Bounce triggerOnce className="absolute">
            <Image
              src={getStrapiMedia(secondImage)}
              width={200}
              height={200}
              alt="Shape"
              className="w-72 sm:w-[360px] animate-spin-slow"
            />
          </Bounce>
        </div>

        <ContactUsForm contact={contact} />

        <div className="flex flex-col items-center mx-auto">
          <div className="inline-flex flex-col items-stretch">
            <Link
              href={`mailto:${contact.mailto}`}
              className="w-full mb-3 flex justify-center items-center text-base uppercase tracking-[2px] font-bold font-goodSans z-20 text-black px-9 py-3 bg-beige border-2 border-black hover:scale-105 duration-300"
            >
              {locale === 'en' ? 'Email us' : 'Schreiben Sie uns eine E-Mail'}
            </Link>
            <Link
              href={`tel:${contact.tel}`}
              className="w-full mb-16 flex justify-center items-center text-base uppercase tracking-[2px] font-bold font-goodSans z-20 text-black px-9 py-3 bg-beige border-2 border-black hover:scale-105 duration-300"
            >
              {locale === 'en' ? 'Call us' : 'Rufen Sie uns an'}
            </Link>
          </div>
        </div>


        <div className="pb-40">
          <Map />

          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center mt-10"
          >
            {contact.locate}
          </Text>

          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center mt-4"
          >
            {contact.contact}
          </Text>

          <Text
            as="p"
            textVariant="h2-xl"
            textColor="beige"
            className="text-center mt-16"
          >
            {contact.times}
          </Text>

          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center mt-2"
          >
            {contact.monday}
          </Text>

          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center mt-2"
          >
            {contact.tuesday}
          </Text>

          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center mt-2"
          >
            {contact.wednesday}
          </Text>

          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center mt-2"
          >
            {contact.thursday}
          </Text>

          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center mt-2"
          >
            {contact.friday}
          </Text>

          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center mt-2"
          >
            {contact.saturday}
          </Text>

          <Text
            as="p"
            textVariant="base"
            textColor="beige"
            className="text-center mt-2"
          >
            {contact.sunday}
          </Text>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [contactRes, footerRes, headerRes, screenmenuRes] = await Promise.all([
    fetchAPI('/contact', {
      populate: '*',
      locale: context.locale,
    }),
    fetchAPI('/footer', {
      populate: {
        Logo_black: { populate: '*' },
        Logo_gold: { populate: '*' },
      },
      locale: context.locale,
    }),
    fetchAPI('/header', {
      populate: {
        first: { populate: '*' },
        second: { populate: '*' },
      },
      locale: context.locale,
    }),
    fetchAPI('/screenmenu', {
      populate: {
        image: { populate: '*' },
        navigation: { populate: '*' },
      },
      locale: context.locale,
    }),
  ]);

  return {
    props: {
      footer: footerRes.data,
      contact: contactRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
      locale: context.locale
    },
    revalidate: 1,
  };
};

export default Contact;
