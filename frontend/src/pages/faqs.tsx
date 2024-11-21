import { GetStaticProps } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Zoom } from 'react-awesome-reveal';
import { useIntl } from 'react-intl';

import { fetchAPI } from '../../lib/api';
import {
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
} from '../../schemas';
import { Layout } from '../shared/ui';

type Props = {
  footer: ApiFooterFooter;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
};

const Faqs = ({ footer, header, screenmenu }: Props) => {
  const intl = useIntl();
  return (
    <Layout
      type="light"
      footer={footer}
      header={header}
      screenmenu={screenmenu}
    >
      <NextSeo title="Faq" />

      <section className="bg-bg-white bg-center relative">
        <div className="container">
          <div className="max-w-7xl">
            <Zoom triggerOnce>
              <h1 className="text-6xl sm:text-7xl md:text-7xl text-center sm:text-center sm:m-auto origin-top tracking-widest uppercase pt-64 font-adieu text-black">
                {intl.formatMessage({ id: 'faqs.faq' })}
              </h1>
            </Zoom>
            <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
              {intl.formatMessage({ id: 'faqs.faqs' })}
            </p>
            <p className="pt-5 px-8 italic text-base text-black font-times text-center uppercase">
              {intl.formatMessage({ id: 'faqs.happy' })}
            </p>
            <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top  uppercase pt-12 font-adieu text-black">
              {intl.formatMessage({ id: 'faqs.general' })}
            </h1>
            <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
              {intl.formatMessage({ id: 'faqs.book' })}
            </h1>
            <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
              {intl.formatMessage({ id: 'faqs.have' })}
            </p>
            <p className="pt-5 px-8 italic text-base text-black font-times text-center uppercase">
              {intl.formatMessage({ id: 'faqs.stop' })}
            </p>
            <div className="mt-12 flex-grow border-t"></div>

            <div>
              <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                {intl.formatMessage({ id: 'faqs.fees' })}
              </h1>

              <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                {intl.formatMessage({ id: 'faqs.entry' })}
              </p>
              <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                {intl.formatMessage({ id: 'faqs.dress' })}
              </h1>
              <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                {intl.formatMessage({ id: 'faqs.celebrate' })}
              </p>
              <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                {intl.formatMessage({ id: 'faqs.need' })}
              </h1>
              <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                {intl.formatMessage({ id: 'faqs.lucky' })}
              </p>
              <h1 className="text-xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                {intl.formatMessage({ id: 'faqs.id' })}
              </h1>
              <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                {intl.formatMessage({ id: 'faqs.photo' })}
              </p>
              <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                {intl.formatMessage({ id: 'faqs.child' })}
              </h1>
              <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                {intl.formatMessage({ id: 'faqs.guest' })}
              </p>
              <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                {intl.formatMessage({ id: 'faqs.allowed' })}
              </p>

              <div>
                <div className="mt-6 flex-grow border-t"></div>
                <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                  {intl.formatMessage({ id: 'faqs.happen' })}
                </h1>
                <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                  {intl.formatMessage({ id: 'faqs.stick' })}
                </p>
                <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                  {intl.formatMessage({ id: 'faqs.time' })}
                </h1>
                <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                  {intl.formatMessage({ id: 'faqs.refer' })}
                </p>
                <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                  {intl.formatMessage({ id: 'faqs.dogs' })}
                </h1>
                <div className="mt-12 flex-grow border-t"></div>
                <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                  {intl.formatMessage({ id: 'faqs.allow' })}
                </p>

                <div>
                  <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                    {intl.formatMessage({ id: 'faqs.music' })}
                  </h1>
                  <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                    {intl.formatMessage({ id: 'faqs.play' })}
                  </p>
                  <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                    {intl.formatMessage({ id: 'faqs.type' })}
                  </h1>
                  <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                    {intl.formatMessage({ id: 'faqs.week' })}
                  </p>
                  <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                    {intl.formatMessage({ id: 'faqs.resident' })}
                  </p>
                  <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                    <Link
                      target="_blank"
                      href="https://open.spotify.com/playlist/5Dkk2I3W5uJWDN91SB968c?si=NIU4hpLWRx6APTQaHYupIA&nd=1"
                    >
                      <strong className="mr-4 text-beige underline">
                        {intl.formatMessage({ id: 'faqs.click' })}
                      </strong>
                    </Link>
                    {intl.formatMessage({ id: 'faqs.track' })}
                  </p>
                  <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                    {intl.formatMessage({ id: 'faqs.allergy' })}
                  </h1>
                  <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                    {intl.formatMessage({ id: 'faqs.gladly' })}
                  </p>
                  <div>
                    <div>
                      <div className="mt-12 flex-grow border-t"></div>
                      <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                        {intl.formatMessage({ id: 'faqs.halal' })}
                      </h1>
                      <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.fortune' })}
                      </p>
                      <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                        {intl.formatMessage({ id: 'faqs.wine' })}
                      </h1>
                      <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.we' })}
                      </p>
                      <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                        {intl.formatMessage({ id: 'faqs.party' })}
                      </h1>
                      <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.offer' })}
                      </p>
                      <div className="mt-12 flex-grow border-t"></div>
                      <h1 className="text-xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                        {intl.formatMessage({ id: 'faqs.proccess' })}
                      </h1>
                      <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.intro' })}
                      </p>
                      <li className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.take' })}
                      </li>
                      <li className="pt-4 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.call' })}
                      </li>
                      <li className="pt-4 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.request' })}
                      </li>
                      <li className="pt-4 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.ask' })}
                      </li>
                      <li className="pt-4 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.police' })}
                      </li>
                      <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.safety' })}
                      </p>
                      <p className="pt-12 px-8 italic text-base text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.more' })}
                        <Link
                          target="_blank"
                          href="https://www.safersounds.org.uk/a4a-resources"
                        >
                          <strong className="ml-4 text-beige">
                            {intl.formatMessage({ id: 'faqs.angela' })}
                          </strong>
                        </Link>
                      </p>
                      <div className="mt-12 flex-grow border-t"></div>

                      <h1 className="text-3xl text-center sm:text-center sm:m-auto origin-top tracking-widest  uppercase pt-12 font-adieu text-black">
                        {intl.formatMessage({ id: 'faqs.dry' })}
                      </h1>
                      <p className="pt-12 pb-12 px-8 italic text-base tracking-widest text-black font-times text-center uppercase">
                        {intl.formatMessage({ id: 'faqs.our' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [footerRes, headerRes, screenmenuRes] = await Promise.all([
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
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
    },
    revalidate: 1,
  };
};

export default Faqs;
