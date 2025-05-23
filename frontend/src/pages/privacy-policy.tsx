import { Layout, Markdown } from '@ab/shared/ui';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

import { fetchAPI } from '../../lib/api';
import {
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
  ApiPolicyPolicy,
} from '../../schemas';

type Props = {
  policy: ApiPolicyPolicy;
  footer: ApiFooterFooter;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
};

const PrivacyPolicy = ({ policy, footer, header, screenmenu }: Props) => (
  <Layout type="light" footer={footer} header={header} screenmenu={screenmenu}>
    <NextSeo title={policy.seo?.title? policy.seo.title : 'Privacy Policy'} />
    <NextSeo description={policy.seo?.description? policy.seo.description : 'Privacy Policy'} />

    <section className="bg-bg-white bg-center relative">
      <div className="container pt-32">
        <div className="section break-words mb-16">
          <Markdown>{policy.content}</Markdown>
        </div>
      </div>
    </section>
  </Layout>
);

export const getStaticProps: GetStaticProps = async context => {
  const [policyRes, footerRes, headerRes, screenmenuRes] = await Promise.all([
    fetchAPI('/policy', {
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
      policy: policyRes.data,
      footer: footerRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
    },
    revalidate: 1,
  };
};

export default PrivacyPolicy;
