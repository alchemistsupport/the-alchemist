import { GetStaticProps } from 'next';
import React from 'react';

import { fetchAPI } from '../../lib/api';
import {
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
  ApiHomepageHomepage,
} from '../../schemas';
import {
  AboutDark,
  AboutWhite,
  GalleryDesktop,
  HeroBanner,
  Layout,
  Menus,
  SignUpForm,
  Seo,
} from '../shared/ui';

type Props = {
  homepage: ApiHomepageHomepage;
  footer: ApiFooterFooter;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
  locale: string
};

const Home = ({ homepage, footer, header, screenmenu, locale }: Props) => {
  const { hero_banner, about_light, gallery, about_dark, menus, sign_up } =
    homepage;
    console.log('Node version:', process.version)
  return (
    <>
      <Seo seo={homepage.seo} />

      <Layout
        type="light"
        footer={footer}
        header={header}
        screenmenu={screenmenu}
      >
        <HeroBanner data={hero_banner} />
        <AboutWhite data={about_light} locale={locale} />
        <GalleryDesktop data={gallery} />
        <AboutDark data={about_dark} images={gallery} />
        <Menus data={menus} />
        <SignUpForm type="light" data={sign_up} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [homepageRes, footerRes, headerRes, screenmenuRes] = await Promise.all([
    fetchAPI('/homepage', {
      populate: {
        seo: { populate: '*' },
        hero_banner: { populate: '*' },
        about_light: { populate: '*' },
        gallery: { populate: '*' },
        about_dark: { populate: '*' },
        menus: {
          populate: {
            gallery_mobile: { populate: '*' },
            gallery_pc: { populate: '*' },
          },
        },
        sign_up: { populate: '*' },
      },
      locale: context.locale,
    }),
    fetchAPI('/footer', {
      populate: '*',
      locale: context.locale,
    }),
    fetchAPI('/header', {
      populate: '*',
      locale: context.locale,
    }),
    fetchAPI('/screenmenu', {
      populate: '*',
      locale: context.locale,
    }),
  ]);

  return {
    props: {
      homepage: homepageRes.data,
      footer: footerRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
      locale: context.locale
    },
    revalidate: 1,
  };
};

export default Home;
