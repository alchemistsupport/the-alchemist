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

type Props = {
  footer: ApiFooterFooter;
  contact: ApiContactContact;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
};
const Contact = ({ footer, contact, header, screenmenu }: Props) => {
  const firstImage = contact.first;
  const secondImage = contact.second;

  return (
    <Layout type="dark" footer={footer} header={header} screenmenu={screenmenu}>
      <NextSeo title="Contact" />

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
    },
    revalidate: 1,
  };
};

export default Contact;
