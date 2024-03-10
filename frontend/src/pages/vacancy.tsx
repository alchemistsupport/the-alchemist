import { useFormik } from 'formik';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useState } from 'react';
import { Bounce, Slide } from 'react-awesome-reveal';
import * as yup from 'yup';

import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import {
  ApiFooterFooter,
  ApiScreenmenuScreenmenu,
  ApiHeaderHeader,
  ApiVacancyVacancy,
} from '../../schemas';
import { FormApi } from '../api/index';
import { Layout, Button, Input, TextArea, Text } from '../shared/ui';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  vacancy: string;
  message: string;
  cv: File | null;
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  subject: yup.string().required('Subject is required'),
  vacancy: yup.string().required('Vacancy is required'),
  message: yup.string().required('Message is required'),
});

type Props = {
  footer: ApiFooterFooter;
  vacancy: ApiVacancyVacancy;
  header: ApiHeaderHeader;
  screenmenu: ApiScreenmenuScreenmenu;
};

const Vacancy = ({ footer, vacancy, header, screenmenu }: Props) => {
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      await FormApi.sendVacancy({
        vacancy: values.vacancy,
        message: values.message,
        email: values.email,
      });

      router.push('/confirmation?type=vacancy');

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const firstImage = vacancy.attributes.first;
  const secondImage = vacancy.attributes.second;
  const thirdImage = vacancy.attributes.third;

  const { setFieldValue, handleChange, handleSubmit, values, errors, touched } =
    useFormik<FormValues>({
      initialValues: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        vacancy: '',
        message: '',
        cv: null,
      },
      validationSchema: validationSchema,
      onSubmit,
    });

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setFieldValue('cv', event.target.files ? event.target.files[0] : null);

  return (
    <Layout footer={footer} type="dark" header={header} screenmenu={screenmenu}>
      <NextSeo title="Vacancy" />

      <section className="section section-dark">
        <div className="container">
          <div className="relative flex justify-center items-center overflow-hidden pt-56 sm:pt-48 pb-10 sm:pb-20">
            <Bounce>
              <Image
                src={getStrapiMedia(firstImage)}
                alt="Gold Sphere"
                width={260}
                height={200}
                className="m-auto sm:w-96"
              />
            </Bounce>

            <Bounce className="absolute">
              <Image
                src={getStrapiMedia(secondImage)}
                alt="Triangle"
                width={310}
                height={200}
                className="z-20 w-[280px] sm:w-[430px]"
              />
            </Bounce>

            <div className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] animate-spin-slow">
              <Image
                src={getStrapiMedia(thirdImage)}
                alt="Alchemist"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <Slide direction="up" triggerOnce>
            <Text
              as="h2"
              textVariant="stroke"
              textColor="beige"
              className="mt-14"
            >
              {vacancy.attributes.title}
            </Text>
          </Slide>

          <Slide direction="up" triggerOnce>
            <Text
              as="p"
              textVariant="base"
              textColor="beige"
              className="w-full sm:w-96 m-auto text-center mt-4"
            >
              {vacancy.attributes.body}
            </Text>
          </Slide>

          <Slide direction="up" triggerOnce>
            <Text
              as="h2"
              textVariant="stroke-xl"
              textColor="beige"
              className="mt-40"
            >
              {vacancy.attributes.apply}
            </Text>
          </Slide>

          <Slide direction="up" triggerOnce>
            <Text
              as="p"
              textVariant="base"
              textColor="beige"
              className="mt-5 text-center"
            >
              {vacancy.attributes.cv}
            </Text>
          </Slide>

          <form onSubmit={handleSubmit} className="pb-40">
            <div className="w-80 sm:w-96 mt-10 m-auto flex flex-col gap-5">
              <Input
                id="name"
                onChange={handleChange}
                value={values.name}
                name="name"
                placeholder={vacancy.attributes.name}
                variant="dark"
                isError={!!errors.name && !!touched.name}
                error={errors.name}
              />

              <Input
                id="email"
                onChange={handleChange}
                value={values.email}
                name="email"
                placeholder={vacancy.attributes.email}
                variant="dark"
                isError={!!errors.email && touched.email}
                error={errors.email}
              />

              <Input
                id="phone"
                onChange={handleChange}
                value={values.phone}
                name="phone"
                type="text"
                placeholder={vacancy.attributes.phone}
                variant="dark"
                isError={!!errors.phone && touched.phone}
                error={errors.phone}
              />

              <Input
                id="subject"
                onChange={handleChange}
                value={values.subject}
                name="subject"
                type="text"
                placeholder={vacancy.attributes.enquiry}
                variant="dark"
                isError={!!errors.subject && touched.subject}
                error={errors.subject}
              />

              <Input
                id="vacancy"
                onChange={handleChange}
                value={values.vacancy}
                name="vacancy"
                type="text"
                placeholder={vacancy.attributes.vacancy}
                variant="dark"
                isError={!!errors.vacancy && touched.vacancy}
                error={errors.vacancy}
              />

              <Input
                id="cv"
                onChange={handleFileInputChange}
                name="cv"
                type="file"
                accept="application/pdf"
                placeholder={vacancy.attributes.vacancy}
                variant="dark"
                isError={!!errors.cv && touched.cv}
                error={errors.cv}
                disabled
              />

              <TextArea
                id="message"
                onChange={handleChange}
                value={values.message}
                name="message"
                placeholder={vacancy.attributes.message}
              />

              <Button
                type="submit"
                name={
                  isLoading
                    ? vacancy.attributes.loading
                    : vacancy.attributes.submit
                }
                variant="beige"
              />
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [vacancyRes, footerRes, headerRes, screenmenuRes] = await Promise.all([
    fetchAPI('/vacancy', {
      populate: {
        seo: '*',
        title: '*',
        body: '*',
        name: '*',
        email: '*',
        phone: '*',
        enquiry: '*',
        message: '*',
        submit: '*',
        loading: '*',
        first: '*',
        second: '*',
        third: '*',
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
      vacancy: vacancyRes.data,
      header: headerRes.data,
      screenmenu: screenmenuRes.data,
    },
    revalidate: 1,
  };
};

export default Vacancy;
