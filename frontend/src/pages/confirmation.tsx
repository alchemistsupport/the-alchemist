import { Layout } from '@ab/shared/ui';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Slide } from 'react-awesome-reveal';

import { fetchAPI } from '../../lib/api';
import {
  ApiConfirmationConfirmation,
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
} from '../../schemas';

type Props = {
  footer: ApiFooterFooter;
  confirmation: ApiConfirmationConfirmation;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
};

const Confirmation = ({ footer, confirmation, header, screenmenu }: Props) => {
  const {
    query: { type },
  } = useRouter();

  const copies: { [key: string]: { title: string; description: string } } = {
    contact: {
      title: confirmation.attributes.contact_title,
      description: confirmation.attributes.contact_description,
    },
    vacancy: {
      title: confirmation.attributes.vacancy_title,
      description: confirmation.attributes.vacancy_description,
    },
    signup: {
      title: confirmation.attributes.signup_title,
      description: confirmation.attributes.signup_description,
    },
  };

  return (
    <Layout
      footer={footer}
      type="light"
      header={header}
      screenmenu={screenmenu}
    >
      <NextSeo title="Faq" />

      {type && (
        <section className="bg-bg-white bg-center relative">
          <div className="container">
            <div className="max-w-7xl">
              <Slide triggerOnce direction="up">
                <h1 className="text-3xl sm:text-6xl md:text-7xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-64 font-adieu text-black">
                  {copies[type as string].title}
                </h1>
              </Slide>

              <Slide triggerOnce direction="up">
                <p className="text-base sm:text-xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase py-20 font-adieu text-black">
                  {copies[type as string].description}
                </p>
              </Slide>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [confirmationRes, footerRes, headerRes, screenmenuRes] =
    await Promise.all([
      fetchAPI('/confirmation', {
        populate: {
          seo: '*',
          contact_title: '*',
          contact_description: '*',
          vacancy_title: '*',
          vacancy_description: '*',
          signup_title: '*',
          signup_description: '*',
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
      confirmation: confirmationRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
    },
    revalidate: 1,
  };
};

export default Confirmation;
