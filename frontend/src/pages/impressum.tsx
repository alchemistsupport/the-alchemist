import { Layout } from '@ab/shared/ui';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import React from 'react';

import { fetchAPI } from '../../lib/api';
import {
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
  ApiImpressumImpressum,
} from '../../schemas';

type Props = {
  footer: ApiFooterFooter;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
  impressum: ApiImpressumImpressum;
};

const Impressum = ({ footer, header, screenmenu, impressum }: Props) => {
  return (
    <Layout
      type="light"
      footer={footer}
      header={header}
      screenmenu={screenmenu}
    >
      <NextSeo title={impressum.seo?.title? impressum.seo.title : 'Impressum'} />
      <NextSeo description={impressum.seo?.description? impressum.seo.description : 'Impressum'} />

      <div className="container">
        <div className="section mb-40 break-words">
          <h1 className="text-xl sm:text-xl md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-64 font-bold text-black">
            {impressum.notice}
          </h1>

          <p className="sm:text-xl md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-16 text-black">
            {impressum.alchem}
          </p>
          <p className="sm:text-xl md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-2 text-black">
            {impressum.place}
          </p>
          <p className="sm:text-xl md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-2 text-black">
            {impressum.locate}
          </p>
          <p className="sm:text-xl md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-16 text-black">
            {impressum.manage}
          </p>
          <p className="sm:text-xl md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-16 text-black">
            {impressum.phone}
          </p>
          <p className="sm:text-xl md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-2 text-black">
            {impressum.mail}
          </p>
          <p className="sm:text-xl md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-16 text-black">
            {impressum.court}
          </p>
          <p className="sm:text-xl md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-2 text-black">
            {impressum.vat}
          </p>
          <p className="sm:text-xl break-words md:text-2xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-16 pb-16 text-black">
            {impressum.europe}
            <Link
              target="_blank"
              href="https://ec.europa.eu/consumers/odr/"
              className="px-2 text-beige break-words"
            >
              {impressum.consumer}
            </Link>
            {impressum.obligate}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [impressumRes, footerRes, headerRes, screenmenuRes] = await Promise.all(
    [
      fetchAPI('/impressum', {
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
    ],
  );

  return {
    props: {
      footer: footerRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
      impressum: impressumRes.data,
    },
    revalidate: 1,
  };
};

export default Impressum;
