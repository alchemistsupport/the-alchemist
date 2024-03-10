import { GetStaticProps } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { Slide } from 'react-awesome-reveal';

import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import {
  ApiBookBook,
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
} from '../../schemas';
import { Layout, Text, OpenTableWidget } from '../shared/ui';

type Props = {
  footer: ApiFooterFooter;
  book: ApiBookBook;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
};

const Book = ({ book, footer, header, screenmenu }: Props) => {
  const singleImage = book.attributes.book;

  return (
    <Layout
      footer={footer}
      type="light"
      screenmenu={screenmenu}
      header={header}
    >
      <NextSeo title="Book" />

      <section className="section section-beige mb-40">
        <div className="container">
          <div>
            <Image
              alt="Gold Vortex"
              src={getStrapiMedia(singleImage)}
              width={200}
              height={200}
              className="w-64 sm:w-96 m-auto pt-32 sm:pt-44"
            />

            <Slide direction="up" triggerOnce>
              <Text
                as="h1"
                textVariant="title"
                className="-translate-y-6 sm:-translate-y-12"
              >
                {book.attributes.title}
              </Text>
            </Slide>

            <div className="m-auto sm:w-96 sm:m-auto text-center">
              <Slide direction="up" triggerOnce>
                <Text as="h2" textVariant="h2-xl">
                  {book.attributes.body}
                </Text>
              </Slide>

              <Slide direction="up" triggerOnce>
                <Text as="p" textVariant="base">
                  {book.attributes.description}
                </Text>
              </Slide>
            </div>

            <Slide direction="up" triggerOnce className="mt-6 md:mt-0">
              <OpenTableWidget />
            </Slide>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [bookRes, footerRes, headerRes, screenmenuRes] = await Promise.all([
    fetchAPI('/book', {
      populate: {
        seo: '*',
        title: '*',
        body: '*',
        description: '*',
        book: '*',
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
      book: bookRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
    },
    revalidate: 1,
  };
};

export default Book;
