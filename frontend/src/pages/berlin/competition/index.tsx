import { Layout, SignUpForm } from '@ab/shared/ui';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { fetchAPI } from '../../../../lib/api';
import {
  ApiFooterFooter,
  ApiHeaderHeader,
  ApiHomepageHomepage,
  ApiScreenmenuScreenmenu,
} from '../../../../schemas';

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
      <div className="container pt-24 md:pt-0">
        <SignUpForm type="light" data={homepage.sign_up} />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [footerRes, headerRes, screenmenuRes, homepageRes] = await Promise.all([
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
    fetchAPI('/homepage', {
      populate: {
        sign_up: { populate: '*' },
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
