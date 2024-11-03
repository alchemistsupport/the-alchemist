import { Layout, SignUpForm } from '@ab/shared/ui';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import React from 'react';
import { Bounce, Zoom } from 'react-awesome-reveal';

import { fetchAPI } from '../../lib/api';
import {
  ApiFooterFooter,
  ApiHeaderHeader,
  ApiHomepageHomepage,
  ApiScreenmenuScreenmenu,
} from '../../schemas';

type Props = {
  footer: ApiFooterFooter;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
  homepage: ApiHomepageHomepage;
};

const SignUp = ({ footer, header, screenmenu, homepage }: Props) => {
  return (
    <Layout
      type="light"
      footer={footer}
      header={header}
      screenmenu={screenmenu}
    >
      <NextSeo title="Sign Up" />

      <div className="bg-about-light bg-no-repeat bg-cover bg-center">
        <div className="container pt-24 md:pt-0">
          <div className="-mb-72 pt-40">
            <Bounce triggerOnce>
              <Image
                alt={
                  homepage.about_light.primary_image.name
                }
                src={
                  homepage.about_light.primary_image.url
                }
                width={450}
                height={550}
                className="mx-auto z-50"
              />
            </Bounce>
          </div>

          <SignUpForm type="light" data={homepage.sign_up} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [footerRes, headerRes, screenmenuRes, homepageRes] = await Promise.all([
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
    fetchAPI('/homepage', {
      populate: {
        sign_up: '*',
        about_light: { populate: '*' },
      },
      locale: context.locale,
    }),
  ]);

  return {
    props: {
      footer: footerRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  };
};

export default SignUp;
